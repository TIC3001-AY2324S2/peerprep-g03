const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  studentID: {
    type: String,
    required: [true, "Please enter studentID"],
  },
  studentName: {
    type: String,
    required: [true, "Please enter studentName"],
  },
  topic: {
    type: String,
    required: [true, "Please enter topic"],
  },
  difficulty: {
    type: String,
    required: [true, "Please enter difficulty"],
  },
  matchStatus: {
    type: String,
    required: [true, "Please enter matchStatus"],
  },
});

// export Student model to be used in controller
module.exports = mongoose.model('Student', studentSchema)


