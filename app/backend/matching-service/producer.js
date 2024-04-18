const express = require("express");
const amqp = require("amqplib");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));
app.use(express.json());

app.post("/send", async (req, res) => {
  console.log("Received message: ", req.body);
  const { username, topics, difficulty } = req.body;
  const message = JSON.stringify({ username, topics, difficulty });
  
  const connection = await amqp.connect("amqp://rabbitmq");
  const channel = await connection.createChannel();

  // Asserting a queue with x-message-ttl argument
  const args = {
    durable: true,
    arguments: {
      'x-message-ttl': 60000  // TTL in milliseconds
    }
  };
  
  //Configure durable message queue
  await channel.assertQueue("durable_message_queue", args);
  //await channel.assertQueue("message_queue", args);
  
  //Send persistent message
  channel.sendToQueue("durable_message_queue", Buffer.from(message), { persistent: true });
  //channel.sendToQueue("message_queue", Buffer.from(message));
  
  await channel.close();
  await connection.close();

  res.json({ message: "Data sent to RabbitMQ with 60s TTL" });
});

app.listen(5001, () => {
  console.log("Producer running on port 5001");
});