import express from "express";
import { loginUser, registerUser, getUserById } from "../controllers/auth.controller.js";
import registerRateLimiter from "../middlewares/rateLimiter.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();
router.post("/loginUser", registerRateLimiter, asyncHandler(loginUser));
router.post("/registerUser", registerRateLimiter, asyncHandler(registerUser));
router.get("/getUserById/:userId", authenticate, asyncHandler(getUserById));
export default router;
