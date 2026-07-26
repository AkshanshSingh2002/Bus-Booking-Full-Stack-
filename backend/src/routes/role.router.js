import express from "express";
import { addRole } from "../controllers/role.controller.js";

const roleRoute = express.Router();

roleRoute.post("/addRole", addRole);

export default roleRoute;