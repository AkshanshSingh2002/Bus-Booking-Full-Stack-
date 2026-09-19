import Redis from "ioredis";

const redis = new Redis({
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: Number(process.env.REDIS_PORT || 6379),
    password: process.env.REDIS_PASSWORD || undefined,
    maxRetriesPerRequest: 3,
    enableReadyCheck: true,
    lazyConnect: true
});

redis.on("connect", () => console.log("Redis connecting"));
redis.on("ready", () => console.log("Redis ready"));
redis.on("error", (error) => console.error("Redis error:", error.message));

export default redis;
