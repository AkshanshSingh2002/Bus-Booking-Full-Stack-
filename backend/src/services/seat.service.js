import { Seat, Bus } from "../models/index.js";
import redis from "../config/redis.js";
import { notFound } from "../utils/appError.js";

const invalidate = async (seat) => redis.del("seats", `seat:${seat.seatId}`, `seatByBusId:${seat.busId}`);

export const createSeatService = async (data) => {
    const bus = await Bus.findByPk(data.busId);
    if (!bus) throw notFound("Bus not found");
    const seat = await Seat.create(data);
    await invalidate(seat);
    return seat;
};

export const getSeatByIdService = async (id) => {
    const key = `seat:${id}`;
    const cache = await redis.get(key);
    if (cache) return JSON.parse(cache);
    const seat = await Seat.findByPk(id);
    if (!seat) return null;
    await redis.set(key, JSON.stringify(seat), "EX", 300);
    return seat;
};

export const getSeatByBusIdService = async (busId) => {
    const key = `seatByBusId:${busId}`;
    const cache = await redis.get(key);
    if (cache) return JSON.parse(cache);
    const seats = await Seat.findAll({ where: { busId }, order: [["seatNumber", "ASC"]] });
    await redis.set(key, JSON.stringify(seats), "EX", 300);
    return seats;
};

export const getAllSeatService = async () => {
    const cache = await redis.get("seats");
    if (cache) return JSON.parse(cache);
    const seats = await Seat.findAll({ order: [["seatId", "DESC"]] });
    await redis.set("seats", JSON.stringify(seats), "EX", 300);
    return seats;
};

export const deleteSeatByIdService = async (id) => {
    const seat = await Seat.findByPk(id);
    if (!seat) throw notFound("Seat not found");
    await seat.destroy();
    await invalidate(seat);
    return seat;
};
