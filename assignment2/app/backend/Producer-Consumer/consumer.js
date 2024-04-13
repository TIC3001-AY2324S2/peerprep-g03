// Require the amqplib package to interact with RabbitMQ
const amqp = require("amqplib");
const mongoose = require('mongoose');

//const { addStudent } = require("./api/controllers/studentController");
const Student = require("./api/models/studentModel");

// import the dependencies required for dotenv
// the config() function allows for reading of the .env file
const dotenv = require("dotenv").config();
// import the connectDB function created earlier
const connectDB = require("./config/db");

// Function to watch matchStatus changes for a student
function watchStudentMatchStatus(studentObjId) {
  // Create a change stream for the student
  const changeStream = Student.watch([{ $match: { _id: studentObjId } }]);

  // Set up a timer to check for changes every 5 seconds
  const interval = setInterval(() => {
    Student.findById(studentObjId)
      .then(student => {
        console.log('Checking: '+ studentObjId+ " : " + student.studentName + " : " + student.matchStatus);
        if (student.matchStatus === "Matched") {
          console.log(studentObjId+': '+'Matched with x !');
          //TO BE IMPLEMENTED: safeguard from race condition : ((current time) - (time at which record was pushed)) < (your interval of timeout)
          clearInterval(interval);
          return;
        }
      })
      .catch(err => {
        console.error('Error finding student:', err);
      });
  }, 5000);

  const timeout = setTimeout(() => {
    clearInterval(interval); // Stop the interval timer
    console.log(studentObjId+': '+'Timeout! No match status change detected within 30 seconds.');

    // Update the student's matchStatus to "Timeout"
    Student.findByIdAndUpdate(studentObjId, { matchStatus: "Timeout" }, { new: true })
      .then(updatedStudent => {
        console.log(studentObjId+': '+'Student matchStatus updated to "Timeout":', updatedStudent);
      })
      .catch(err => {
        console.error(studentObjId+': '+'Error updating student matchStatus:', err);
      });
  }, 60000);
}

(async () => {
  // initialize connection to MongoDB database
  await connectDB();

  // Create a connection to the local RabbitMQ server
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  // Assert a queue exists (or create it if it doesn't) named "message_queue"
  await channel.assertQueue("message_queue");

  // Start consuming messages from the queue "message_queue"
  channel.prefetch(1);
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
      watchStudentMatchStatus(savedStudent._id);
    })
    .catch(err => {
      console.error("Error saving student:", err);
    });


    channel.ack(message); // Acknowledge the message so RabbitMQ knows it has been processed
    console.log("Message acknowledged successfully.");
  }, { noAck: false });
  
  console.log("Consumer waiting for messages...");
})();
