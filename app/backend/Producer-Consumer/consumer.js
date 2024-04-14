
const amqp = require("amqplib");
const WebSocket = require('ws');

const ws = new WebSocket.Server({ port: 8080 });

let pendingMatches = [];
let clients = new Map(); // Map to track clients by username

const difficultyLevels = {
  easy: 1,
  medium: 2,
  hard: 3,
};

ws.on('connection', function connection(ws, req) {
  ws.on('message', function incoming(message) {
    const { type, username } = JSON.parse(message);
    if (type === 'register') {
      clients.set(username, ws);
      console.log(`Registered ${username}`);
    }
  });

  ws.on('close', () => {
    // Find and remove the username associated with this ws
    for (let [username, clientWs] of clients.entries()) {
      if (clientWs === ws) {
        clients.delete(username);
        console.log(`${username} disconnected`);
        break;
      }
    }
  });
});

function parseMessage(messageContent) {
  return JSON.parse(messageContent);
}

function findBestMatch(newMessage, pendingMatches) {
  let bestMatchIndex = -1;
  let smallestDifficultyGap = Infinity;

  pendingMatches.forEach((pendingMessage, index) => {
    if (pendingMessage.username !== newMessage.username && pendingMessage.topics.some(topic => newMessage.topics.includes(topic))) {
      const difficultyGap = Math.abs(difficultyLevels[newMessage.difficulty] - difficultyLevels[pendingMessage.difficulty]);
      if (difficultyGap < smallestDifficultyGap) {
        smallestDifficultyGap = difficultyGap;
        bestMatchIndex = index;
      }
    }
  });
  return bestMatchIndex;
}

(async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  await channel.assertQueue('message_queue');

  channel.consume('message_queue', (message) => {
    const newMessage = parseMessage(message.content.toString());

    const matchIndex = findBestMatch(newMessage, pendingMatches);

    if (matchIndex !== -1) {
      const matchedMessage = pendingMatches.splice(matchIndex, 1)[0]; // Remove matched

      console.log(`Match found: ${newMessage.username} matched with ${matchedMessage.username}`);
      [newMessage.username, matchedMessage.username].forEach(username => {
        const client = clients.get(username);
        if (client && client.readyState === WebSocket.OPEN) {
          console.log("sending msg to client")
          client.send(JSON.stringify({ type: 'match', matchWith: username === newMessage.username ? matchedMessage.username : newMessage.username }));
        } else {
          console.log("WebSocket is not open for username:", username);
      }
      });
    } else {
      pendingMatches.push(newMessage);
      console.log('No match found, added to pending matches:', newMessage);
    }

    channel.ack(message);
  });

  console.log('Consumer waiting for messages...');
})();