import mongoose from "mongoose";

var Schema = mongoose.Schema;

let MatchingModelSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  topic: {
    type: String,
    required: true,
    unique: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Assign4MatchModel", MatchingModelSchema);
