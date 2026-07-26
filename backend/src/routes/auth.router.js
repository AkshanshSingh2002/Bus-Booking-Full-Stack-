import express from 'express';
import { loginUser, registerUser } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post("/loginUser", loginUser);
authRouter.post("/registerUser", registerUser);

export default authRouter;