import {
    createSeatService,
    getSeatByIdService,
    getSeatByBusIdService,
    getAllSeatService,
    deleteSeatByIdService
} from "../services/seat.service.js";

export const addSeat = async (req, res) => {
    try {
        const seat = await createSeatService(req.body);

        res.status(200).json({
            success: true,
            message: "Seat Created Successfully",
            data: seat
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getSeatById = async (req, res) => {
    try {
        const seats = await getSeatByIdService(req.params.id);

        if (!seats) {
            return res.status(404).json({
                success: false,
                message: "Seat not found",
            });
        }

        res.status(200).json({
            success: true,
            data: seats,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
// fafs
export const getSeatByBusId = async (req, res) => {
    try {
        const seats = await getSeatByBusIdService(req.params.id);

        if (!seats) {
            return res.status(404).json({
                success: false,
                message: "Seat not found",
            });
        }

        res.status(200).json({
            success: true,
            data: seats,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAllSeats = async (req, res) => {
    try {
        const seats = await getAllSeatService();

        res.status(200).json({
            success: true,
            data: seats,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteSeatById = async (req, res) => {
    try {
        const deletedSeat = await deleteSeatByIdService(req.params.id);

        res.status(200).json({
            success: true,
            data: deletedSeat
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};