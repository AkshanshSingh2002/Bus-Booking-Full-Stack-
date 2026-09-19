import crypto from "node:crypto";
import logger from "../observability/logger.js";

export const requestContext = (req, res, next) => {
    const requestId = req.headers["x-request-id"] || crypto.randomUUID();
    req.requestId = requestId;
    res.setHeader("x-request-id", requestId);
    res.on("finish", () => logger.info({ requestId, method: req.method, url: req.originalUrl, statusCode: res.statusCode }, "HTTP request"));
    next();
};
