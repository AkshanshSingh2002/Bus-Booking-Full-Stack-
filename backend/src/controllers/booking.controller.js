import { createBooking, getBookingRecordByIdService, getBookingRecordByBusIdService, getBookingRecordByBusNameService, getAllBookingRecordService, getBookingRecordByUserIdService, deleteBookingRecordByBookingIdService } from "../services/booking.service.js";

const getUserId = (req) => req.user?.userId || req.body.userId;

export const addBookingRecord = async (req, res) => {
    const userId = getUserId(req);
    const idempotencyKey = req.headers["idempotency-key"] || req.body.idempotencyKey;
    const data = await createBooking({ userId, busId: req.body.busId, seatId: req.body.seatId, idempotencyKey });
    res.status(201).json({ success: true, message: "Booking created", data });
};
export const getBookingRecordById = async (req, res) => res.status(200).json({ success: true, data: await getBookingRecordByIdService(req.params.bookingId) });
export const getBookingRecordByBusId = async (req, res) => res.status(200).json({ success: true, data: await getBookingRecordByBusIdService(req.params.busId) });
export const getBookingRecordByBusName = async (req, res) => res.status(200).json({ success: true, data: await getBookingRecordByBusNameService(req.params.busName) });
export const getBookingRecordByUserId = async (req, res) => res.status(200).json({ success: true, data: await getBookingRecordByUserIdService(req.params.userId) });
export const getAllBookingRecord = async (req, res) => res.status(200).json({ success: true, data: await getAllBookingRecordService() });
export const deleteBookingRecordByBookingId = async (req, res) => res.status(200).json({ success: true, data: await deleteBookingRecordByBookingIdService(req.params.bookingId) });
