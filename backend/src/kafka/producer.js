import kafka from "../config/kafka.js";
import logger from "../observability/logger.js";

const producer = kafka.producer({ allowAutoTopicCreation: true });
let connected = false;

export const connectProducer = async () => {
    if (process.env.KAFKA_ENABLED !== "true") return;
    if (connected) return;
    await producer.connect();
    connected = true;
    logger.info("Kafka producer connected");
};

export const sendKafkaMessage = async ({ topic, key, value }) => {
    if (process.env.KAFKA_ENABLED !== "true") return;
    if (!connected) await connectProducer();
    return producer.send({ topic, messages: [{ key: String(key ?? ""), value: JSON.stringify(value) }] });
};

export const disconnectProducer = async () => {
    if (!connected) return;
    await producer.disconnect();
    connected = false;
};

export default producer;
