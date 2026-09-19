import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import busRoute from "./routes/bus.router.js";
import seatRoute from "./routes/seat.router.js";
import authRoute from "./routes/auth.router.js";
import roleRoute from "./routes/role.router.js";
import bookingRouter from "./routes/booking.router.js";
import paymentRouter from "./routes/payment.router.js";
import { requestContext } from "./middlewares/requestContext.middleware.js";
import { notFoundHandler, errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.disable("x-powered-by");
app.set("trust proxy", 1);

app.use(helmet());
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true
}));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cookieParser());
app.use(requestContext);

app.get("/health", (req, res) => res.status(200).json({ success: true, message: "Bus Booking API is running" }));
app.get("/ready", (req, res) => res.status(200).json({ success: true, message: "Bus Booking API is ready" }));

app.use("/api/auth", authRoute);
app.use("/api/buses", busRoute);
app.use("/api/seats", seatRoute);
app.use("/api/role", roleRoute);
app.use("/api/booking", bookingRouter);
app.use("/api/payment", paymentRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
