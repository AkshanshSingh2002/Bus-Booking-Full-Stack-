import express from "express";
import { addRole, changeRoleById } from "../controllers/role.controller.js";

const roleRoute = express.Router();

roleRoute.post("/addRole", addRole);
roleRoute.post("/changeRoleById", changeRoleById);

export default roleRoute;