const Redis = require("ioredis");

// connect to Redis server
const client = new Redis({
  host: "127.0.0.1",  // if Redis runs locally
  port: 6379          // default Redis port
});

client.on("connect", () => {
  console.log("✅ Connected to Redis");
});

client.on("error", (err) => {
  console.error("❌ Redis error:", err);
});

module.exports = client;
