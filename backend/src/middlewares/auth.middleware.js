import jwt from "jsonwebtoken";
import { unauthorized } from "../utils/appError.js";

export const authenticate = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) return next(unauthorized());
    const token = header.slice(7);
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        next(unauthorized("Invalid or expired access token"));
    }
};
