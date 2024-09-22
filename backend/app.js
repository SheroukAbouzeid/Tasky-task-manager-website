import express from 'express';
import router from './routes/auth.js';
import mongoose from 'mongoose';

const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());

// DB Connection
mongoose.connect(
  "mongodb+srv://youssefelmasryy:DEPI@cluster0.93r76.mongodb.net/Task-management"
);

const db = mongoose.connection;

db.on('error', () => {
    console.log("Connection Error!")
})

db.once('open', () => {
    console.log('Connected to DB!')
})




app.use(router);
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


