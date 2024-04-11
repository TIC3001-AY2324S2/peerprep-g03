const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter address title"],
  },
  description: {
    type: String,
    required: [true, "Please enter address description"],
  },
});

// export Address model to be used in controller
module.exports = mongoose.model("Address", addressSchema);
