// Require the amqplib package to interact with RabbitMQ
const amqp = require("amqplib");
const WebSocket = require('ws');
const mongoose = require('mongoose');
const express = require ('express');
const cors = require("cors");

const { addStudent } = require("./api/controllers/studentController");
const Student = require("./api/models/studentModel");

// initialize the Express.js application
// store it in the app variable
const app = express();

// allow cross-origin requests to reach the Expres.js server
// from localhost:3000, which is your frontend domain
app.options(
  "*",
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);
app.use(cors());

// import the dependencies required for dotenv
// the config() function allows for reading of the .env file
const dotenv = require("dotenv").config();
// import the connectDB function created earlier
const connectDB = require("./config/db");

// initialize connection to MongoDB database
connectDB();

const PORT = 8080 || process.env.PORT;

// allow JSON data in request body to be parsed
app.use(express.json());
// allow URL-encoded data in request body to be parsed
app.use(express.urlencoded({ extended: false }));

// configure the Express.js application to run at port 8080
// since you will be running this application on your computer (localhost),
// the backend server will be running at http://localhost:8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});

// when a GET request is made to http://localhost:8080/,
// the response will be { message: 'Hello World' } in JSON format
app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

// export Express.js application to be used elsewhere
module.exports = app;

// Setting up a WebSocket server
const wss = new WebSocket.Server({ port: 3080 });

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

// Function to watch matchStatus changes for a student
function watchStudentMatchStatus(studentObjId) {
  // Create a change stream for the student
  const changeStream = Student.watch([{ $match: { _id: studentObjId } }]);

  // Listen for changes in the 'change' event
  changeStream.on('change', change => {
    console.log('Match status changed:', change.updateDescription.updatedFields.matchStatus);
  });

  // Set up a timer to check for changes every 5 seconds
  const interval = setInterval(() => {
    console.log('Checking for matchStatus changes...');
    // Perform check for matchStatus changes here
  }, 1000);

  const timeout = setTimeout(() => {
    clearInterval(interval); // Stop the interval timer
    console.log('Timeout! No match status change detected within 30 seconds.');

    // Update the student's matchStatus to "Timeout"
    Student.findByIdAndUpdate(studentObjId, { matchStatus: "Timeout" }, { new: true })
      .then(updatedStudent => {
        console.log('Student matchStatus updated to "Timeout":', updatedStudent);
      })
      .catch(err => {
        console.error('Error updating student matchStatus:', err);
      });
  }, 20000);
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
    const messageContent = JSON.parse(message.content.toString());
    console.log("Parsed message:", messageContent);
    messageContent.matchStatus = "Finding match";


    const newStudent = new Student(messageContent);
    
    newStudent.save()
    .then(savedStudent => {
      console.log("New student saved successfully:", savedStudent._id);

      // Call the watchStudentMatchStatus function for the newly saved student
      watchStudentMatchStatus(savedStudent._id, () => {
        // Acknowledge the RabbitMQ message after the timeout logic completes
        channel.ack(message);
      });
    })
    .catch(err => {
      console.error("Error saving student:", err);
    });

    //safeguard from race condition : ((current time) - (time at which record was pushed)) < (your interval of timeout)

    //Timeout for unmatched message
    /*setTimeout(() => {
      console.log(`Timeout! No match found for ${messageContent.studentName}`);
      const timeoutMessage = 'Timeout! No match found.';

      // Broadcast timeout message to all connected clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'timeout', message: timeoutMessage }));
        }
      });
    }, 30000); // 30-second timeout*/
    
    //channel.ack(message); // Acknowledge the message so RabbitMQ knows it has been processed
    //console.log("Ack Message 2");
  });

  console.log("Consumer waiting for messages...");
})();
