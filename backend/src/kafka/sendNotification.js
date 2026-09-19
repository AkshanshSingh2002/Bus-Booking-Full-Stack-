import kafka from "../config/kafka.js";
import logger from "../observability/logger.js";
import { User } from "../models/index.js";
import sendEmail from "../utils/sendRefundFailedEmail.js";
import TOPICS from "./topic.js";

export const startNotificationConsumer = async () => {
  const consumer = kafka.consumer({ groupId: "bus-booking-notification" });
  await consumer.connect();
  await consumer.subscribe({
    topic: TOPICS.NOTIFICATION,
    fromBeginning: false,
  });
  await consumer.run({
    eachMessage: async ({ message }) => {
      const event = JSON.parse(message.value.toString());
      const bookingUser = event.userId
        ? await User.findByPk(event.userId, { attributes: ["userEmail"] })
        : null;
      if (!bookingUser?.userEmail) return;
      const subject =
        event.type === "BOOKING_CONFIRMED"
          ? "Booking Confirmed"
          : "Refund Successful";
      await sendEmail({
        email: bookingUser.userEmail,
        bookingId: event.bookingId,
        razorpayPaymentId: event.razorpayPaymentId || "N/A",
        error: "",
        Heading: subject,
        messageForCustomer:
          event.type === "BOOKING_CONFIRMED"
            ? "Your booking has been confirmed successfully."
            : "Your refund has been processed successfully.",
      });
    },
  });
  logger.info("Notification consumer started");
  return consumer;
};
