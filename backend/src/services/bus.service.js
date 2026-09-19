import { Bus } from "../models/index.js";
import redis from "../config/redis.js";
import { notFound } from "../utils/appError.js";

export const createBusService = async (data) => {
    const bus = await Bus.create(data);
    await redis.del("buses");
    return bus;
};

export const getBusByIdService = async (id) => {
    const key = `bus:${id}`;
    const cache = await redis.get(key);
    if (cache) return JSON.parse(cache);
    const bus = await Bus.findByPk(id);
    if (!bus) return null;
    await redis.set(key, JSON.stringify(bus), "EX", 300);
    return bus;
};

export const getAllBusService = async () => {
    const cache = await redis.get("buses");
    if (cache) return JSON.parse(cache);
    const buses = await Bus.findAll({ order: [["busId", "DESC"]] });
    await redis.set("buses", JSON.stringify(buses), "EX", 300);
    return buses;
};

export const deleteBusByIdService = async (id) => {
    const bus = await Bus.findByPk(id);
    if (!bus) throw notFound("Bus not found");
    await bus.destroy();
    await redis.del("buses", `bus:${id}`);
    return bus;
};
