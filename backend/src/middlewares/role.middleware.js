import { forbidden } from "../utils/appError.js";

export const requireRole = (...allowedRoles) => (req, res, next) => {
    const roles = req.user?.roles || (req.user?.role ? [req.user.role] : []);
    if (!roles.some((role) => allowedRoles.includes(role))) return next(forbidden());
    next();
};
