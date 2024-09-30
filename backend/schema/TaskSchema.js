import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  dueDate: {
    type: Date,
  },
  priority: {
    type: String,
    enum: ["high", "mid", "low"],
    required: true,
  },
  tag: {
    type: String,
    enum: ["work", "school", "home", "project", "health", "sports"],
    required: true,
  },
  status: {
    type: String,
    enum: ["inprogress", "completed"],
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Task", TaskSchema);
