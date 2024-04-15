const amqp = require("amqplib");
const WebSocket = require('ws');
const { v4: uuidv4} = require('uuid')

const ws = new WebSocket.Server({ port: 8080 });
let clients = new Map(); // Track WebSocket connections by username
let sessions = new Map()
let pendingMatches = [];

const difficultyLevels = {
  easy: 1,
  medium: 2,
  hard: 3,
};

function adjustDifficulty(level1, level2) {
  if (level1 === level2) return Object.keys(difficultyLevels).find(key => difficultyLevels[key] === level1);
  if (Math.abs(level1 - level2) === 2) return 'medium';
  return Object.keys(difficultyLevels).find(key => difficultyLevels[key] === Math.max(level1, level2));
}

ws.on('connection', (socket, req) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  console.log("request url: ", req.url)
  const sessionId = url.searchParams.get('sessionId');
  console.log("session in consumer is :", sessionId)
  if (sessionId) {
    sessions.get(sessionId).add(socket);
    socket.on('message', message => {
      console.log("message from consumer:", message)
      sessions.get(sessionId).forEach(client => {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    })
  })
 } else {
  socket.on('message', (message) => {
    const { type, username } = JSON.parse(message);
    if (type === 'register') {
      clients.set(username, socket);
      console.log(`WebSocket registered for ${username}`);
    }
  });

  socket.on('close', () => {
    clients.forEach((clientWs, username) => {
      if (clientWs === socket) {
        clients.delete(username);
        console.log(`${username} disconnected`);
        // Remove from pending matches if disconnected
        pendingMatches = pendingMatches.filter(pm => pm.username !== username);
      }
    });
  });
}});

function parseMessage(messageContent) {
  return JSON.parse(messageContent);
}

function findBestMatch(newMessage, pendingMatches) {
  let bestMatchIndex = -1;
  let smallestDifficultyGap = Infinity;
  let sharedTopics = [];

  pendingMatches.forEach((pendingMessage, index) => {
    const commonTopics = newMessage.topics.filter(topic => pendingMessage.topics.includes(topic));
    if (pendingMessage.username !== newMessage.username && commonTopics.length > 0) {
      const difficultyGap = Math.abs(difficultyLevels[newMessage.difficulty] - difficultyLevels[pendingMessage.difficulty]);
      if (difficultyGap < smallestDifficultyGap) {
        smallestDifficultyGap = difficultyGap;
        bestMatchIndex = index;
        sharedTopics = commonTopics;
      }
    }
  });

  return { bestMatchIndex, sharedTopics };
}

(async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  channel.consume('message_queue', (message) => {
    const newMessage = parseMessage(message.content.toString());
    const { bestMatchIndex, sharedTopics } = findBestMatch(newMessage, pendingMatches);

    if (bestMatchIndex !== -1) {
      const matchedMessage = pendingMatches.splice(bestMatchIndex, 1)[0];
      const adjustedDifficulty = adjustDifficulty(difficultyLevels[newMessage.difficulty], difficultyLevels[matchedMessage.difficulty]);
      console.log(`Match found: ${newMessage.username} matched with ${matchedMessage.username}`);
      const sessionId = uuidv4();
      console.log(`Match found: ${newMessage.username} matched with ${matchedMessage.username}`);
      [newMessage.username, matchedMessage.username].forEach(username => {
        const client = clients.get(username);
        if (client && client.readyState === WebSocket.OPEN) {
          console.log("sessionid: ", sessionId )
          sessions.set(sessionId, new Set())
          client.send(JSON.stringify({
            type: 'match',
            matchWith: username === newMessage.username ? matchedMessage.username : newMessage.username,
            topics: sharedTopics,
            difficulty: adjustedDifficulty,
            sessionId: sessionId
          }));
        }
      });
      channel.ack(message);
    } else {
      pendingMatches.push(newMessage);
      console.log(`Stored in pending matches: ${newMessage.username}`);
    }
  }, { noAck: false });

  console.log('Consumer waiting for messages...');
})();