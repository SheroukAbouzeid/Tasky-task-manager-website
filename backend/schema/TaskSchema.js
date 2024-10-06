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
    type: String,
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
    default: "inprogress",
  },
  userID: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Task", TaskSchema,'Tasks');
