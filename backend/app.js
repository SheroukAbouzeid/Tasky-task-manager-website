import express from 'express';
import router from './routes/auth.js';
import mongoose from 'mongoose';
import cors from 'cors';
import { swaggerDocs, swaggerUi } from "./swaggerConfig.js"; 

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
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

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));



app.use(router);
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


