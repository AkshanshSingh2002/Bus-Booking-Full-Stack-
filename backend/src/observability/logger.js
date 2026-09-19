import pino from "pino";

const logger = pino({
    level: process.env.LOG_LEVEL || "info",
    base: { service: process.env.SERVICE_NAME || "bus-booking-service" },
    timestamp: pino.stdTimeFunctions.isoTime,
    redact: {
        paths: ["req.headers.authorization", "req.headers.cookie", "password", "userPassword", "token"],
        censor: "[REDACTED]"
    }
});

export default logger;
