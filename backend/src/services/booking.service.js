import { Op } from "sequelize";
import sequelize from "../config/database.js";
import { Booking, Payment, Seat, Bus } from "../models/index.js";
import { acquireSeatLock, releaseSeatLock } from "./redisLock.service.js";
import { createRazorpayOrder } from "./razorpay.service.js";
import { bookingCreatedCounter } from "../observability/metrics.js";
import { conflict, notFound } from "../utils/appError.js";

const HOLD_DURATION_MS = Number(process.env.BOOKING_HOLD_MINUTES || 10) * 60 * 1000;

export const createBooking = async ({ userId, busId, seatId, idempotencyKey }) => {
    const existing = await Booking.findOne({ where: { userId, idempotencyKey }, include: [{ model: Payment, as: "payment" }] });
    if (existing) return { booking: existing, payment: existing.payment };

    const lock = await acquireSeatLock(busId, seatId);
    if (!lock) throw conflict("Seat is currently being processed");

    let transaction;
    try {
        transaction = await sequelize.transaction();
        const seat = await Seat.findOne({ where: { seatId, busId }, transaction, lock: transaction.LOCK.UPDATE });
        if (!seat) throw notFound("Seat not found");
        if (seat.status !== "AVAILABLE") throw conflict("Seat is not available");
        const booking = await Booking.create({ userId, busId, seatId, bookingStatus: "PENDING", expiresAt: new Date(Date.now() + HOLD_DURATION_MS), idempotencyKey }, { transaction });
        const payment = await Payment.create({ bookingId: booking.bookingId, amount: seat.amount, currency: "INR", status: "CREATED", idempotencyKey: `${idempotencyKey}:payment` }, { transaction });
        await seat.update({ status: "HELD" }, { transaction });
        await transaction.commit();
        bookingCreatedCounter.add(1);

        try {
            const order = await createRazorpayOrder({ amount: payment.amount, currency: payment.currency, receipt: `booking_${booking.bookingId}` });
            await payment.update({ razorpayOrderId: order.id });
            return { booking, payment, razorpayOrder: order };
        } catch (error) {
            await expireBookingById(booking.bookingId);
            throw error;
        }
    } catch (error) {
        if (transaction && !transaction.finished) await transaction.rollback();
        throw error;
    } finally {
        await releaseSeatLock(lock.key, lock.token).catch(() => {});
    }
};

export const expireBookingById = async (bookingId) => {
    const transaction = await sequelize.transaction();
    try {
        const booking = await Booking.findByPk(bookingId, { transaction, lock: transaction.LOCK.UPDATE });
        if (!booking || booking.bookingStatus !== "PENDING") { await transaction.rollback(); return false; }
        const seat = await Seat.findByPk(booking.seatId, { transaction, lock: transaction.LOCK.UPDATE });
        await booking.update({ bookingStatus: "EXPIRED", expiresAt: null }, { transaction });
        if (seat && seat.status === "HELD") await seat.update({ status: "AVAILABLE" }, { transaction });
        await transaction.commit();
        return true;
    } catch (error) {
        if (!transaction.finished) await transaction.rollback();
        throw error;
    }
};

export const expirePendingBookingsService = async () => {
    const bookings = await Booking.findAll({ where: { bookingStatus: "PENDING", expiresAt: { [Op.lt]: new Date() } }, attributes: ["bookingId"] });
    for (const booking of bookings) await expireBookingById(booking.bookingId);
    return bookings.length;
};

export const getBookingRecordByIdService = async (id) => {
    const booking = await Booking.findByPk(id, { include: [{ model: Bus, as: "bus" }, { model: Seat, as: "seat" }, { model: Payment, as: "payment" }] });
    if (!booking) throw notFound("Booking not found");
    return booking;
};
export const getBookingRecordByBusIdService = (busId) => Booking.findAll({ where: { busId }, order: [["bookingId", "DESC"]] });
export const getBookingRecordByBusNameService = (busName) => Booking.findAll({ include: [{ model: Bus, as: "bus", where: { busName } }] });
export const getAllBookingRecordService = () => Booking.findAll({ include: [{ model: Bus, as: "bus" }, { model: Seat, as: "seat" }, { model: Payment, as: "payment" }] });
export const getBookingRecordByUserIdService = (userId) => Booking.findAll({ where: { userId }, include: [{ model: Payment, as: "payment" }] });

export const deleteBookingRecordByBookingIdService = async (id) => {
    const transaction = await sequelize.transaction();
    try {
        const booking = await Booking.findByPk(id, { transaction, lock: transaction.LOCK.UPDATE });
        if (!booking) throw notFound("Booking not found");
        const seat = await Seat.findByPk(booking.seatId, { transaction, lock: transaction.LOCK.UPDATE });
        if (seat && seat.status !== "BOOKED") await seat.update({ status: "AVAILABLE" }, { transaction });
        if (booking.bookingStatus === "CONFIRMED") booking.bookingStatus = "CANCELLED";
        else await booking.destroy({ transaction });
        if (booking.bookingStatus === "CANCELLED") await booking.save({ transaction });
        await transaction.commit();
        return booking;
    } catch (error) {
        if (!transaction.finished) await transaction.rollback();
        throw error;
    }
};
