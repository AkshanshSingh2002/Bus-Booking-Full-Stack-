import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID || "bus-booking-service",
    brokers: (process.env.KAFKA_BROKERS || process.env.KAFKA_BROKER || "localhost:9092").split(","),
    connectionTimeout: 10000,
    requestTimeout: 30000,
    retry: { retries: 5 }
});

export default kafka;
