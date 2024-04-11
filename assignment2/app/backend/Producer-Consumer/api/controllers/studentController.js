// import Student model
const { error } = require("console");
const Student = require("../models/studentModel");

// @desc    Fetch all students
// @route   GET /api/students
// @access  Public
const fetchAllStudents = async (req, res) => {
  // function provided by Mongoose to fetch all Student documents
  const students = await Student.find({});

  // return all students in JSON format
  // with success status 200
  res.status(200).json(students);
};

const getStudentByID = async (req, res) => {
    // function provided by Mongoose to fetch all Student documents
    try {
        const student = await Student.findById(req.params.id);
        console.log(student);
        if (student) {
            res.status(200).json(student);
        } else {
            res.status(404).json({ message: "No valid entry found for provided ID" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
};


// @desc    Add a student
// @route   POST /api/students
// @access  Public
const addStudent = async (req, res) => {
  const { studentID, studentName, topic, difficulty, matchStatus} = req.body;

  // validate request body
  if (!studentID || !studentName || !topic || !difficulty || !matchStatus) {
    return res.status(400).json({ message: "Please enter all fields." });
  }

  try {
    // function provided by Mongoose to create a new Student document
    const student = await Student.create({
      studentID,
      studentName,
      topic,
      difficulty,
      matchStatus,
    });

    // return the newly created Student in JSON format
    // with created success status 201
    res.status(201).json({
      _id: student._id,
      studentID: student.studentID,
      studentName: student.studentName,
      topic: student.topic,
      difficulty: student.difficulty,
      matchStatus: student.matchStatus,
    });
  } catch (error) {
    // catch exception when fields are missing
    res.status(400).json({ message: "Invalid student data. : " +error });
  }
};


// @desc    Update an student
// @route   PUT /api/students
// @access  Public
const updateStudent = async (req, res) => {
    const { studentID, studentName, topic, difficulty, matchStatus} = req.body;
    console.log(req.body);

  // validate request body
  if (!studentID || !studentName || !topic || !difficulty || !matchStatus) {
    return res.status(400).json({ message: "Please enter all fields." + req.body });
  }

  try {
    // function provided by mongoose to find an
    // Student document with a given ID
    // req.params.id is retrieved from /:id in route
    const student = await Student.findById(req.params.id);

    // update the document
    student.studentID = studentID;
    student.studentName = studentName;
    student.topic = topic;
    student.difficulty = difficulty;
    student.matchStatus = matchStatus;

    // function provided by mongoose to
    // save the changes made to a document
    await student.save();

    // return the updated student in JSON format
    // with success status 200
    res.status(200).json({
      _id: student._id,
      title: student.title,
      description: student.description,
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid student data." });
  }
};

// @desc    Delete a student
// @route   DELETE /api/students
// @access  Public
const deleteStudent = async (req, res) => {
  try {
    // function provided by mongoose to find an
    // Student document with a given ID
    // req.params.id is retrieved from /:id in route
    const student = await Student.findById(req.params.id);

    // function provided by mongoose to delete a document
    await student.deleteOne();

    res.status(200).json({ message: "Student removed" });
  } catch (error) {
    res.status(404).json({ message: "Student not found" });
  }
};

const fetchStudentsByTopic = async (req, res) => {
  try {
    // Find students whose topic field matches any value in the topics array
    const students = await Student.find(req.params.topic);

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// export controller functions to be used in corresponding route
module.exports = {
  fetchAllStudents,
  getStudentByID,
  addStudent,
  updateStudent,
  deleteStudent,
  fetchStudentsByTopic,
};
