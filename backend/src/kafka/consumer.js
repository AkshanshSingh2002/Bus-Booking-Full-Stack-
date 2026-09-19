import kafka from "../config/kafka.js";
import logger from "../observability/logger.js";
import TOPICS from "./topic.js";

export const startPaymentConsumer = async (handler) => {
    const consumer = kafka.consumer({ groupId: "bus-booking-payment-db" });
    await consumer.connect();
    await consumer.subscribe({ topic: TOPICS.PAYMENT_DB_RETRY, fromBeginning: false });
    await consumer.run({ eachMessage: async ({ message }) => handler(JSON.parse(message.value.toString())) });
    logger.info("Payment consumer started");
    return consumer;
};
