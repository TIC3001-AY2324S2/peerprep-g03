// Require the amqplib package to interact with RabbitMQ
const amqp = require("amqplib");
const WebSocket = require('ws');


// Setting up a WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log('A new client connected');

  // You can store ws in a structure for targeted messaging if needed
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  // Placeholder: Send an initial message or keep alive signal if necessary
  ws.send('Connection established');
});




let pendingMatches = [];

const difficultyLevels = {
  easy: 1,
  medium: 2,
  hard: 3
};


// Immediately-invoked Function Expression (IIFE) to use async-await at the top level

function parseMessage(messageContent) {
  const [studentName, studentId, topic, difficulty] = messageContent.split(" : ").map(part => part.trim());
  return { studentName, studentId, topic, difficulty };
}

function findBestMatch(newMessage, pendingMatches) {
  let bestMatchIndex = -1;
  let smallestDifficultyGap = Infinity;

  for (let i = 0; i < pendingMatches.length; i++) {
    if (newMessage.topic === pendingMatches[i].topic) {
      const difficultyGap = Math.abs(difficultyLevels[newMessage.difficulty] - difficultyLevels[pendingMatches[i].difficulty]);
      if (difficultyGap < smallestDifficultyGap) {
        smallestDifficultyGap = difficultyGap;
        bestMatchIndex = i;
      }
    }
  }
  return bestMatchIndex;
}

(async () => {
  // Create a connection to the local RabbitMQ server
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  // Assert a queue exists (or create it if it doesn't) named "message_queue"
  await channel.assertQueue("message_queue");

  // Start consuming messages from the queue "message_queue"
  channel.consume("message_queue", (message) => {
    console.log("Received message:", message.content.toString());
    const newMessage = parseMessage(message.content.toString());
    console.log("Parsed message:", newMessage);
    

    // Timeout for unmatched message
    setTimeout(() => {
      console.log(`Timeout! No match found for ${newMessage.studentName}`);
      const timeoutMessage = 'Timeout! No match found.';

      // Broadcast timeout message to all connected clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'timeout', message: timeoutMessage }));
        }
      });
    }, 3000); // 3-second timeout

    channel.ack(message); // Acknowledge the message so RabbitMQ knows it has been processed
  });

  console.log("Consumer waiting for messages...");
})();
