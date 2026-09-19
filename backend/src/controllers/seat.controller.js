import { createSeatService, getSeatByIdService, getSeatByBusIdService, getAllSeatService, deleteSeatByIdService } from "../services/seat.service.js";

export const addSeat = async (req, res) => res.status(201).json({ success: true, data: await createSeatService(req.body) });
export const getSeatById = async (req, res) => res.status(200).json({ success: true, data: await getSeatByIdService(req.params.id) });
export const getSeatByBusId = async (req, res) => res.status(200).json({ success: true, data: await getSeatByBusIdService(req.params.id) });
export const getAllSeats = async (req, res) => res.status(200).json({ success: true, data: await getAllSeatService() });
export const deleteSeatById = async (req, res) => res.status(200).json({ success: true, data: await deleteSeatByIdService(req.params.id) });
