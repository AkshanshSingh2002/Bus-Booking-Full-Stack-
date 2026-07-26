import {
    addBookingRecordService,
    getBookingRecordByIdService,
    getBookingRecordByBusIdService,
    getAllBookingRecordService,
    deleteBookingRecordByBookingIdService

} from "../services/booking.service.js";

export const addBookingRecord = async (req, res) => {
    try {
        const booking = await addBookingRecordService(req.body);

        res.status(201).json({
            success: true,
            message: "Booking Successfully",
            data: booking
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getBookingRecordById = async (req, res) => {
    try {
        const bookings = await getBookingRecordByIdService(req.params.bookingId);

        if (!bookings) {
            return res.status(404).json({
                success: false,
                message: "Booking not found",
            });
        }

        res.status(200).json({
            success: true,
            data: bookings,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
// fafs
export const getBookingRecordByBusId = async (req, res) => {
    try {
        const bookings = await getBookingRecordByBusIdService(req.params.busId);

        if (!bookings || bookings.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Bookinga not found",
            });
        }

        res.status(200).json({
            success: true,
            data: bookings,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAllBookingRecord = async (req, res) => {
    try {
        const bookings = await getAllBookingRecordService();

        res.status(200).json({
            success: true,
            data: bookings,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteBookingRecordByBookingId = async (req, res) => {
    try {
        const deletedBooking = await deleteBookingRecordByBookingIdService(req.params.bookingId);

        res.status(200).json({
            success: true,
            data: deletedBooking
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};