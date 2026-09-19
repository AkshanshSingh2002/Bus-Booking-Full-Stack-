import "./observability/instrumentation.js";
import dotenv from "dotenv";
dotenv.config();

import http from "node:http";
import app from "./app.js";
import sequelize from "./config/database.js";
import redis from "./config/redis.js";
import logger from "./observability/logger.js";
import { connectProducer, disconnectProducer } from "./kafka/producer.js";

import "./models/index.js";
import { seedDefaultRoles } from "./config/seed.js";

const PORT = Number(process.env.PORT || 5000);
let server;

async function connectDatabase() {
    await sequelize.authenticate();
    logger.info("Database connection established");
    if (process.env.NODE_ENV !== "production") {
        await sequelize.sync();
        logger.info("Database tables synchronized");
        await seedDefaultRoles();
        logger.info("Default roles verified");
    }
}

async function connectRedis() {
    if (redis.status === "wait") await redis.connect();
    await redis.ping();
    logger.info("Redis connection established");
}

async function startServer() {
    try {
        await connectDatabase();
        await connectRedis();
        if (process.env.KAFKA_ENABLED === "true") await connectProducer();

        server = http.createServer(app);
        server.listen(PORT, () => logger.info({ port: PORT }, "HTTP server started"));
    } catch (error) {
        logger.fatal({ err: error }, "Application startup failed");
        process.exit(1);
    }
}

async function shutdown(signal) {
    logger.info({ signal }, "Graceful shutdown started");
    try {
        if (server) await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
        if (process.env.KAFKA_ENABLED === "true") await disconnectProducer();
        if (redis.status !== "end") await redis.quit();
        await sequelize.close();
        logger.info("Graceful shutdown completed");
        process.exit(0);
    } catch (error) {
        logger.error({ err: error }, "Graceful shutdown failed");
        process.exit(1);
    }
}

process.once("SIGINT", () => shutdown("SIGINT"));
process.once("SIGTERM", () => shutdown("SIGTERM"));

startServer();
