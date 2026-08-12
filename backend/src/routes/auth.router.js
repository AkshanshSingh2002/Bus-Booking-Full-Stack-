import express from 'express';
import { loginUser, registerUser, getUserById } from '../controllers/auth.controller.js';
import registerRateLimiter from '../middlewares/rateLimiter.middleware.js';

const authRouter = express.Router();

authRouter.post("/loginUser", loginUser);
authRouter.post("/registerUser", registerRateLimiter, registerUser);
authRouter.get("/getUserById/:userId", getUserById);

export default authRouter;