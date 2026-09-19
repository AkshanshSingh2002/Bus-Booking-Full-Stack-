import express from "express";
import { addBookingRecord, getBookingRecordById, getBookingRecordByBusId, getBookingRecordByBusName, getAllBookingRecord, getBookingRecordByUserId, deleteBookingRecordByBookingId } from "../controllers/booking.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();
router.post("/addBookingRecord", authenticate, asyncHandler(addBookingRecord));
router.get("/getBookingRecordById/:bookingId", authenticate, asyncHandler(getBookingRecordById));
router.get("/getBookingRecordByBusId/:busId", authenticate, requireRole("ADMIN", "OPERATOR"), asyncHandler(getBookingRecordByBusId));
router.get("/getBookingRecordByBusName/:busName", authenticate, requireRole("ADMIN", "OPERATOR"), asyncHandler(getBookingRecordByBusName));
router.get("/getBookingRecordByUserId/:userId", authenticate, asyncHandler(getBookingRecordByUserId));
router.get("/getAllBookingRecord", authenticate, requireRole("ADMIN", "OPERATOR"), asyncHandler(getAllBookingRecord));
router.delete("/deleteBookingRecordByBookingId/:bookingId", authenticate, asyncHandler(deleteBookingRecordByBookingId));
export default router;
