import { registerService, userLoginService, getUserByIdService } from "../services/auth.service.js";

export const loginUser = async (req, res) => res.status(200).json({ success: true, message: "User logged in", data: await userLoginService(req.body) });
export const registerUser = async (req, res) => res.status(201).json({ success: true, message: "User registered", data: await registerService(req.body) });
export const getUserById = async (req, res) => res.status(200).json({ success: true, data: await getUserByIdService(req.params.userId) });
