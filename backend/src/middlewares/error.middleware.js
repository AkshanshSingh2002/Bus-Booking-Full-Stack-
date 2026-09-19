import logger from "../observability/logger.js";

export const notFoundHandler = (req, res) => {
    res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
};

export const errorHandler = (error, req, res, next) => {
    logger.error({ err: error, method: req.method, url: req.originalUrl }, "Request failed");
    const status = error.statusCode || (error.name === "SequelizeUniqueConstraintError" ? 409 : 500);
    res.status(status).json({
        success: false,
        code: error.code || (status === 500 ? "INTERNAL_ERROR" : "REQUEST_ERROR"),
        message: status === 500 ? "Internal server error" : error.message
    });
};
