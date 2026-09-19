import crypto from "node:crypto";
import redis from "../config/redis.js";

const LOCK_TTL_SECONDS = 15;

export const acquireSeatLock = async (busId, seatId) => {
    const key = `lock:seat:${busId}:${seatId}`;
    const token = crypto.randomUUID();
    const acquired = await redis.set(key, token, "NX", "EX", LOCK_TTL_SECONDS);
    return acquired ? { key, token } : null;
};

export const releaseSeatLock = async (key, token) => {
    const script = `if redis.call('GET', KEYS[1]) == ARGV[1] then return redis.call('DEL', KEYS[1]) else return 0 end`;
    return redis.eval(script, 1, key, token);
};
