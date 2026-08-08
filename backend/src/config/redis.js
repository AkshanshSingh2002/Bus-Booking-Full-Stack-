import Redis from "ioredis";
import dotenv from "dotenv";

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});

redis.on("connect", () => {
    console.log("✅ Redis Connected");
});

redis.on("error", (err) => {
    console.error("Redis Error:", err.message);
});

export default redis;