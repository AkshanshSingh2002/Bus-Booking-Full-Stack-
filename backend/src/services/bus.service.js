import { where } from "sequelize";
import Bus from "../models/bus.js";
import redis from "../config/redis.js";

export const createBusService = async (data) => {
    const bus = await Bus.create(data);

    // Invalidate cache
    await redis.del("buses");

    return bus;
};

export const getBusByIdService = async (id) => {
    const key = `bus:${id}`;
    const cache = await redis.get(key);

    if (cache) {
        console.log("Cache Hit");
        return JSON.parse(cache);
    }

    console.log("Cache Miss");

    const bus = await Bus.findByPk(id);

    if (!bus) {
        return null;
    }

    await redis.set(key, JSON.stringify(bus), "EX", 300);

    return bus;
};

export const getAllBusService = async () => {
    const cache = await redis.get("buses");

    if (cache) {
        console.log("Cache Hit");
        return JSON.parse(cache);
    }

    console.log("Cache Failed");
    const buses = await Bus.findAll();

    await redis.set("buses", JSON.stringify(buses), "EX", 300);

    return buses;
};

export const deleteBusByIdService = async (id) => {
    const deletedRows = await Bus.destroy({
        where: {
            busId: id,
        },
    });

    if (deletedRows > 0) {
        await redis.del("buses");
        await redis.del(`bus:${id}`); // if you cache individual buses
    }

    return deletedRows;
};
