import express from "express";
import { addSeat, getSeatById, getSeatByBusId, getAllSeats, deleteSeatById } from "../controllers/seat.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();
router.get("/getAllSeats", asyncHandler(getAllSeats));
router.get("/getSeatById/:id", asyncHandler(getSeatById));
router.get("/getSeatByBusId/:id", asyncHandler(getSeatByBusId));
router.post("/addSeat", authenticate, requireRole("ADMIN"), asyncHandler(addSeat));
router.delete("/deleteSeatById/:id", authenticate, requireRole("ADMIN"), asyncHandler(deleteSeatById));
export default router;
