import sequelize from "../config/database.js";
import { Booking, Payment, Seat } from "../models/index.js";
import { notFound, conflict } from "../utils/appError.js";
import {
  bookingConfirmedCounter,
  paymentFailedCounter,
} from "../observability/metrics.js";
import { sendKafkaMessage } from "../kafka/producer.js";
import TOPICS from "../kafka/topic.js";


import {  Refund } from "../models/index.js";

export const confirmPayment = async ({
  razorpayOrderId,
  razorpayPaymentId,
}) => {
  const transaction = await sequelize.transaction();
  try {
    const payment = await Payment.findOne({
      where: { razorpayOrderId },
      transaction,
      lock: transaction.LOCK.UPDATE,
    });
    if (!payment) throw notFound("Payment not found");
    if (payment.status === "CAPTURED") {
      await transaction.commit();
      return { success: true, alreadyProcessed: true };
    }

    const booking = await Booking.findByPk(payment.bookingId, {
      transaction,
      lock: transaction.LOCK.UPDATE,
    });
    if (!booking) throw notFound("Booking not found");
    const seat = await Seat.findByPk(booking.seatId, {
      transaction,
      lock: transaction.LOCK.UPDATE,
    });
    if (!seat) throw notFound("Seat not found");
    if (booking.bookingStatus !== "PENDING")
      throw conflict("Booking is no longer pending");
    if (booking.expiresAt && new Date(booking.expiresAt) < new Date())
      throw conflict("Booking hold has expired");
    if (seat.status !== "HELD") throw conflict("Seat is not held");

    await payment.update(
      { razorpayPaymentId, status: "CAPTURED" },
      { transaction },
    );
    await booking.update(
      { bookingStatus: "CONFIRMED", expiresAt: null },
      { transaction },
    );
    await seat.update({ status: "BOOKED" }, { transaction });
    await transaction.commit();
    bookingConfirmedCounter.add(1);

    await sendKafkaMessage({
      topic: TOPICS.NOTIFICATION,
      key: String(booking.bookingId),
      value: {
        type: "BOOKING_CONFIRMED",
        bookingId: booking.bookingId,
        userId: booking.userId,
        amount: payment.amount,
      },
    }).catch((kafkaError) => {
      console.error("Failed to publish BOOKING_CONFIRMED event:", kafkaError);
    });
    return { success: true };
  } catch (error) {
    paymentFailedCounter.add(1);
    if (!transaction.finished) await transaction.rollback();
    throw error;
  }
};

export const getPaymentByBookingId = async (bookingId) => {
  const payment = await Payment.findOne({ where: { bookingId } });
  if (!payment) throw notFound("Payment not found");
  return payment;
};

export const markPaymentRefundPending = async (razorpayOrderId) => {
  const transaction = await sequelize.transaction();

  try {
    // 1. Payment find karo
    const payment = await Payment.findOne({
      where: {
        razorpayOrderId,
      },

      transaction,

      lock: transaction.LOCK.UPDATE,
    });

    if (!payment) {
      throw new Error("Payment not found");
    }

    // 2. Existing refund check karo
    let refund = await Refund.findOne({
      where: {
        razorpayPaymentId: payment.razorpayPaymentId,
      },

      transaction,

      lock: transaction.LOCK.UPDATE,
    });

    // 3. Refund nahi hai -> create
    if (!refund) {
      refund = await Refund.create(
        {
          bookingId: payment.bookingId,

          razorpayPaymentId: payment.razorpayPaymentId,

          amount: payment.amount,

          status: "REFUND_PENDING",
        },
        {
          transaction,
        },
      );
    } else {
      // 4. Existing refund ko pending karo
      await refund.update(
        {
          status: "REFUND_PENDING",
        },
        {
          transaction,
        },
      );
    }

    // 5. Payment ko bhi refund pending
    await payment.update(
      {
        status: "REFUND_PENDING",
      },
      {
        transaction,
      },
    );

    await transaction.commit();

    console.log("Payment marked REFUND_PENDING", razorpayOrderId);

    return refund;
  } catch (error) {
    if (!transaction.finished) {
      await transaction.rollback();
    }

    throw error;
  }
};
