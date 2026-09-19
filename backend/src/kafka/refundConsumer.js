import kafka from "../config/kafka.js";
import logger from "../observability/logger.js";
import TOPICS from "./topic.js";
import { processRefund } from "./refundProcess.js";
import { sendKafkaMessage } from "./producer.js";

const MAX_RETRIES = 2;

export const startRefundConsumer = async () => {
    const consumer = kafka.consumer({ groupId: "bus-booking-refund" });
    await consumer.connect();
    await consumer.subscribe({ topic: TOPICS.PAYMENT_REFUND, fromBeginning: false });
    await consumer.run({ eachMessage: async ({ message }) => {
        const event = JSON.parse(message.value.toString());
        try {
            await processRefund(event);
        } catch (error) {
            const retry = Number(event.refundRetryCount || 0);
            if (retry < MAX_RETRIES) {
                await sendKafkaMessage({ topic: TOPICS.PAYMENT_REFUND, key: event.razorpayPaymentId, value: { ...event, refundRetryCount: retry + 1 } });
            } else {
                await sendKafkaMessage({ topic: TOPICS.PAYMENT_REFUND_DLQ, key: event.razorpayPaymentId, value: { ...event, error: error.message } });
            }
            logger.error({ err: error, retry }, "Refund processing failed");
        }
    }});
    logger.info("Refund consumer started");
    return consumer;
};
