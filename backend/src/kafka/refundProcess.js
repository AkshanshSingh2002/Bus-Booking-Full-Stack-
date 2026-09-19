import { Payment, Refund } from "../models/index.js";
import { refundRazorpayPayment } from "../services/razorpay.service.js";
import { sendKafkaMessage } from "./producer.js";
import TOPICS from "./topic.js";

export const processRefund = async ({ bookingId, razorpayPaymentId }) => {
  const payment = await Payment.findOne({ where: { bookingId } });
  if (!payment) throw new Error("Payment not found");
  if (payment.status === "REFUNDED")
    return { success: true, alreadyRefunded: true };

  let refund = await Refund.findOne({ where: { razorpayPaymentId } });
  if (!refund)
    refund = await Refund.create({
      bookingId,
      razorpayPaymentId,
      amount: payment.amount,
      status: "REFUND_PENDING",
    });
  if (refund.status === "REFUND_SUCCESS")
    return { success: true, alreadyRefunded: true };

  await payment.update({ status: "REFUND_PENDING" });
  const razorpayRefund = await refundRazorpayPayment({
    razorpayPaymentId,
    amount: payment.amount,
  });
  await refund.update({
    status: "REFUND_SUCCESS",
    razorpayRefundId: razorpayRefund.id,
  });
  await payment.update({
    status: "REFUNDED",
    razorpayRefundId: razorpayRefund.id,
  });
  await sendKafkaMessage({
    topic: TOPICS.NOTIFICATION,
    key: bookingId,
    value: { type: "REFUND_SUCCESS", bookingId, amount: payment.amount },
  });
  return { success: true };
};
