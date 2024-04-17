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
  if (sessionId ) {
    if (sessions.has(sessionId)) {
      console.log("valid session id")
      sessions.get(sessionId).add(socket);
      socket.on('message', message => {
        console.log(JSON.parse(message))
        const parsedMsg = JSON.parse(message)
        sessions.get(sessionId).forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({text: parsedMsg.text, username: parsedMsg.username}));
          }
      })
    socket.on('close', () => {
      sessions.delete(sessionId);
      console.log("sessionid delete: ", sessionId)
    })
  })
 } else {
    socket.close(1008, "Invalid session id or session id expired")
    console.log("Invalid session id")
    console.log("session id: ", sessionId, sessions)
 }}
 
 else {
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
  let highestTopicMatchCount = 0; // Tracks the highest count of matching topics
  let smallestDifficultyGap = Infinity; // Tracks the smallest difficulty gap
  let sharedTopics = [];

  pendingMatches.forEach((pendingMessage, index) => {
    const commonTopics = newMessage.topics.filter(topic => pendingMessage.topics.includes(topic));
    const difficultyGap = Math.abs(difficultyLevels[newMessage.difficulty] - difficultyLevels[pendingMessage.difficulty]);

    if (pendingMessage.username !== newMessage.username && commonTopics.length > highestTopicMatchCount ||
       (commonTopics.length === highestTopicMatchCount && difficultyGap < smallestDifficultyGap)) {
      highestTopicMatchCount = commonTopics.length;
      smallestDifficultyGap = difficultyGap;
      bestMatchIndex = index;
      sharedTopics = commonTopics;
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
      // const question = fetchQuestion(sharedTopics?.join(','), adjustedDifficulty)
      [newMessage.username, matchedMessage.username].forEach(username => {
        const client = clients.get(username);
        if (client && client.readyState === WebSocket.OPEN) {
          console.log("sessionid: ", sessionId )
          sessions.set(sessionId, new Set())
          const difficulty = adjustedDifficulty
          client.send(JSON.stringify({
            type: 'match',
            matchWith: username === newMessage.username ? matchedMessage.username : newMessage.username,
            topics: sharedTopics,
            difficulty,
            sessionId: sessionId,
            // question: JSON.stringify(question)
            // question: fetchQuestion(sharedTopics?.join(','), difficulty)
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


// async function fetchQuestion(topics, difficulty) {
//   const url = `http://127.0.0.1:5000/questions?categories=${topics}&complexity=${encodeURIComponent(difficulty)}`;
//     console.log("fetching question")
//     response = await fetch(url)
//     data = await response.json()
//     if (data.length > 0) {
//       const randomQuestion = data[Math.floor(Math.random() * data.length)];
//       console.log(randomQuestion)
//         return randomQuestion
//     }
//   }