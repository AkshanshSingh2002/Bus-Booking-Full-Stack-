export class AppError extends Error {
    constructor(message, statusCode = 500, code = "INTERNAL_ERROR") {
        super(message);
        this.name = "AppError";
        this.statusCode = statusCode;
        this.code = code;
        this.isOperational = true;
    }
}

export const badRequest = (message) => new AppError(message, 400, "BAD_REQUEST");
export const unauthorized = (message = "Authentication required") => new AppError(message, 401, "UNAUTHORIZED");
export const forbidden = (message = "Access denied") => new AppError(message, 403, "FORBIDDEN");
export const notFound = (message) => new AppError(message, 404, "NOT_FOUND");
export const conflict = (message) => new AppError(message, 409, "CONFLICT");
