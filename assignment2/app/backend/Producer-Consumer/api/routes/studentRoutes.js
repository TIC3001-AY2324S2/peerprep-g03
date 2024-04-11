const express = require("express");
const router = express.Router();

const {
  fetchAllStudents,
  getStudentByID,
  addStudent,
  updateStudent,
  deleteStudent,
  fetchStudentsByTopic,
} = require("../controllers/studentController");

// call the fetchAllStudents function
// when a GET request is made to http://localhost:8080/api/students/
router.route("/").get(fetchAllStudents);

// call the addStudent function
// when a POST request is made to http://localhost:8080/api/students/
router.route("/:id").get(getStudentByID);

// call the addStudent function
// when a POST request is made to http://localhost:8080/api/students/
router.route("/").post(addStudent);

// call the updateStudent function
// when a PUT request is made to http://localhost:8080/api/students/:id
router.route("/:id").put(updateStudent);

// call the deleteStudent function
// when a DELETE request is made to http://localhost:8080/api/students/:id
router.route("/:id").delete(deleteStudent);

// Route to fetch students by topic
router.get("/byTopic", fetchStudentsByTopic);

module.exports = router;
