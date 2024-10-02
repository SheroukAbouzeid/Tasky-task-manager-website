import { Router } from "express";
import { loginUser, registerUser } from "../controllers/userController.js";
import { addTask , getCompletedTasks, getUserTasks , deleteTask } from "../controllers/taskController.js";

const router = Router();

//tip from masry: everytime we access something in db we use try catch block


//Register route
router.post("/register", registerUser);
// Login route
router.post("/login", loginUser);

//--------------------------------------------------------task routes--------------------------------------------------------//

// Add Task Route
router.post('/task', addTask);

// get tasks by userID (from route parameter)
router.get('/tasks/:userId', getUserTasks);

// GET completed tasks by userID (from query parameter)
router.get('/tasks/completed', getCompletedTasks);

// delete task by taskID
router.delete('/task/:taskId', deleteTask);


export default router;






