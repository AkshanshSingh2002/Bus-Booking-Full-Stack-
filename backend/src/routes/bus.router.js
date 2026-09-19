import express from "express";
import { addBus, getAllBuses, getBusById, deleteBusById } from "../controllers/bus.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();
router.get("/", asyncHandler(getAllBuses));
router.get("/getAllBuses", asyncHandler(getAllBuses));
router.get("/getBusById/:id", asyncHandler(getBusById));
router.post("/addBus", authenticate, requireRole("ADMIN"), asyncHandler(addBus));
router.delete("/deleteBusById/:id", authenticate, requireRole("ADMIN"), asyncHandler(deleteBusById));
export default router;
