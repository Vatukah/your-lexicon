// src/config/redisClient.js
import { createClient } from "redis";

let redisClient;

export async function initRedis() {
  redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        reconnectStrategy: (retries) => Math.min(retries * 200, 5000), // backoff
        connectTimeout: 8000
    }
});

  redisClient.on("connect", () => console.log("✅ Redis connected"));
  redisClient.on("error", (err) => console.error("❌ Redis Error:", err));
  redisClient.on("end", () => console.warn("⚠️ Redis disconnected"));
 
  // Connect in background, don't block server start
  redisClient.connect().catch((err) => {
    console.error("Redis initial connect failed:", err.message);
  });

  return redisClient;
}

export function getRedis() {
  if (!redisClient) {
    throw new Error("Redis not initialized. Call initRedis() first.");
  }

  return redisClient;
}
