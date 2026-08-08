import { where } from 'sequelize';
import Seat from '../models/seat.js';
import redis from '../config/redis.js';

export const createSeatService = async (data) => {
    const seat = await Seat.create(data);

    await redis.del("seats");
    await redis.del(`seatByBusId:${data.busId}`);

    return seat;
};

export const getSeatByIdService = async (id) => {
    const key = `seat:${id}`;
    const cache = await redis.get(key);

    if (cache) {
        console.log("Cache Hit");
        return JSON.parse(cache);
    }

    console.log("Cache Missed");

    const seat = await Seat.findByPk(id);

    await redis.set(
        key,
        JSON.stringify(seat),
        "EX",
        300
    ) 

    return seat;
};

export const getSeatByBusIdService = async (id) => {
    const key = `seatByBusId:${id}`;
    const cache = await redis.get(key);

    if (cache) {
        console.log("Cache Hit");
        return JSON.parse(cache);
    }

    console.log("Cache Missed");

    const seats = await Seat.findAll({
        where: {
            busId: id
        }
    });

    await redis.set(key, JSON.stringify(seats), 'EX', 300);

    return seats;
};

export const getAllSeatService = async () => {
    const cache = await redis.get("seats");

    if (cache) {
        console.log("Cache Hit");
        return JSON.parse(cache);
    }

    console.log("Cache Failed");

    const seats = await Seat.findAll();

    await redis.set("seats", JSON.stringify(seats), "EX", 300);

    return seats;
};

export const deleteSeatByIdService = async (id) => {
    const seat = await Seat.findByPk(id);

    if (!seat) {
        return 0;
    }

    const busId = seat.busId;

    const deletedRows = await Seat.destroy({
        where: {
            seatId: id,
        },
    });

    if (deletedRows > 0) {
        await redis.del(`seat:${id}`);
        await redis.del(`seatByBusId:${busId}`);
        await redis.del("seats");
    }

    return deletedRows;
};