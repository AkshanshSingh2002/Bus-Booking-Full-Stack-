import { rateLimit } from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import redis from "../config/redis.js";

const registerRateLimiter = rateLimit({
    windowMs: 2 * 60 * 1000,
    limit: 1,

    // standardHeaders: "draft-8",
    // legacyHeaders: false,

    store: new RedisStore({
        sendCommand: (...args) => redis.call(...args),
    }),
});

export default registerRateLimiter;