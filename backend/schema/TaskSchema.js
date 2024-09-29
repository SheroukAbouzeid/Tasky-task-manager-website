import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    priority: {
        type: String,
        enum: ['high', 'mid', 'low'],
        required: true,
    },
    tag: {
        type: String,
        enum: ['school', 'work', 'sports', 'home', 'project', 'health'], // Fixed typo in 'shcool' and 'peoject'
        required: true,
    },
    status: {
        type: String,
        enum: ['inprogress', 'completed'],
        required: true,
    },
    userID: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Task', Tasks, 'Tasks');
