import { createBusService, getBusByIdService, getAllBusService, deleteBusByIdService } from "../services/bus.service.js";

export const addBus = async (req, res) => res.status(201).json({ success: true, message: "Bus successfully created", data: await createBusService(req.body) });
export const getBusById = async (req, res) => res.status(200).json({ success: true, data: await getBusByIdService(req.params.id) });
export const getAllBuses = async (req, res) => res.status(200).json({ success: true, data: await getAllBusService() });
export const deleteBusById = async (req, res) => res.status(200).json({ success: true, data: await deleteBusByIdService(req.params.id) });
