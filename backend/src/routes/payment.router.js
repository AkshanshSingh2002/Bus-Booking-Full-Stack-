import express from "express";
import { verifyPayment, getPayment } from "../controllers/payment.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();
router.post("/verify", authenticate, asyncHandler(verifyPayment));
router.get("/booking/:bookingId", authenticate, asyncHandler(getPayment));
export default router;
