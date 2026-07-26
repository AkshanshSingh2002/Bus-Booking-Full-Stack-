import express from "express";
import { addSeat, getSeatById, getSeatByBusId, getAllSeats, deleteSeatById } from "../controllers/seat.controller.js";

const seatRouter = express.Router();

seatRouter.post("/addSeat", addSeat);
seatRouter.get("/getAllSeats", getAllSeats);
seatRouter.get("/getSeatById/:id", getSeatById);
seatRouter.get("/getSeatByBusId/:id", getSeatByBusId);
seatRouter.delete("/deleteSeatById/:id", deleteSeatById);




export default seatRouter;