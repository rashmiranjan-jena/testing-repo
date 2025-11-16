const express = require("express");
const axios = require("axios").default;
const client = require("./client");

const app = express();
const PORT = 9000;

app.get("/", async (req, res) => {
  try {
    // check cache first
    const clientCache = await client.get("todos");

    if (clientCache) {
      console.log("✅ Data from Redis cache");
      return res.json(JSON.parse(clientCache));
    }

    // if not cached, fetch from API
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/todos");

    // save in Redis with expiry 20s
     client.set("todos", JSON.stringify(data));
     client.expire("todos", 20);

    console.log("🌍 Data from API");
    return res.json(data);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error fetching todos");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
