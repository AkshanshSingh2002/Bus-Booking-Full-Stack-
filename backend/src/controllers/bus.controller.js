import {
    createBusService,
    getBusByIdService,
    getAllBusService,
    deleteBusByIdService,
} from "../services/bus.service.js";

export const addBus = async (req, res) => {
    try {
        const response = await createBusService(req.body);

        res.status(201).json({
            success: true,
            message: "Bus successfully created",
            data: response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getBusById = async (req, res) => {
    try {
        const buses = await getBusByIdService(req.params.id);

        if (!buses) {
            return res.status(404).json({
                success: false,
                message: "Bus not found",
            });
        }

        res.status(200).json({
            success: true,
            data: buses,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAllBuses = async (req, res) => {
    try {
        const buses = await getAllBusService();

        res.status(200).json({
            success: true,
            data: buses,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteBusById = async (req, res) => {
    try {
        const deletedBus = await deleteBusByIdService(req.params.id);

        res.status(200).json({
            success: true,
            data: deletedBus
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};