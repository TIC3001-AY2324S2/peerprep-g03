// Import the express package to create and configure the server
const express = require("express");
const amqp = require("amqplib");

// Initialize the express application
const app = express();

// Import the cors middleware to enable CORS on the server
const cors = require("cors");

app.use(cors({
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200
}));
app.use(express.json());

app.post("/send", async (req, res) => {
  console.log("Received message: ", req.body)
  const { username, topics, difficulty } = req.body;
  const message = JSON.stringify({ username, topics, difficulty });
  console.log("msg received: ", message)
  const connection = await amqp.connect("amqp://127.0.0.1");
  const channel = await connection.createChannel();
  await channel.assertQueue("message_queue");
  channel.sendToQueue("message_queue", Buffer.from(message));

  await channel.close();
  await connection.close();

  res.json({ message: "Data sent to RabbitMQ" });
});
// Start the server on port 3000
app.listen(5001, () => {
  console.log("Producer running on port 5001");
});
