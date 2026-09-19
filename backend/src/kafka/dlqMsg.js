import kafka from "../config/kafka.js";
import logger from "../observability/logger.js";
import TOPICS from "./topic.js";
import { Refund } from "../models/index.js";
import sendEmail from "../utils/sendRefundFailedEmail.js";

export const startDlqConsumer = async () => {
  const consumer = kafka.consumer({ groupId: "bus-booking-dlq" });
  await consumer.connect();
  await consumer.subscribe({
    topic: TOPICS.PAYMENT_REFUND_DLQ,
    fromBeginning: false,
  });
  await consumer.run({
    eachMessage: async ({ message }) => {
      const event = JSON.parse(message.value.toString());
      const refund = await Refund.findOne({
        where: { razorpayPaymentId: event.razorpayPaymentId },
      });
      if (refund)
        await refund.update({ status: "REFUND_FAILED", error: event.error });
      if (refund?.customerEmail)
        await sendEmail({
          email: refund.customerEmail,
          bookingId: event.bookingId,
          razorpayPaymentId: event.razorpayPaymentId,
          error: event.error,
          Heading: "Refund Processing Failed",
          messageForCustomer:
            "Your refund could not be processed automatically.",
        });
    },
  });
  logger.info("DLQ consumer started");
  return consumer;
};
