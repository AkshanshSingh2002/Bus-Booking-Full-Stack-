import express from 'express';
import busRoute from './routes/bus.router.js';
import seatRoute from './routes/seat.router.js';
import authRoute from './routes/auth.router.js';
import roleRoute from './routes/role.router.js';
// import { cors } from 'cors'; 
// import { helmet } from 'helmet';
// import morgan from 'morgan';
// import cookieParser from 'cookie-parser';   

const app = express();

// Built-in Middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Third-party Middleware
// app.use(cors());
// app.use(helmet());
// app.use(morgan("dev"));
// app.use(cookieParser());

app.use("/api/buses", busRoute);
app.use("/api/seats", seatRoute);
app.use("/api/auth", authRoute);
app.use("/api/role", roleRoute);


// Routes
// app.get("/", (req, res) => {
//     res.status(200).json({
//         success: true,
//         message: "Bus Booking API is running..."
//     });
// });

export default app;
