import express from "express";
import { addRole, changeRoleById } from "../controllers/role.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();
router.post("/addRole", authenticate, requireRole("ADMIN"), asyncHandler(addRole));
router.post("/changeRoleById", authenticate, requireRole("ADMIN"), asyncHandler(changeRoleById));
export default router;
