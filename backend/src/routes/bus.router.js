import express from "express";
import { addBus, getAllBuses, getBusById, deleteBusById } from "../controllers/bus.controller.js";

const busRouter = express.Router();

busRouter.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Bus Booking API is running..."
    });
});

busRouter.post("/addBus", addBus);
busRouter.get("/getAllBuses", getAllBuses);
busRouter.get("/getBusById/:id",getBusById);
busRouter.delete("/deleteBusById/:id",deleteBusById);




export default busRouter;