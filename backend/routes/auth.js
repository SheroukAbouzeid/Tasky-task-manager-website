import { Router } from "express";
import bcrypt from "bcryptjs";
import Users from "../schema/UserSchema.js";
import Tasks from "../schema/TaskSchema.js";

const router = Router();

//tip from masry: everytime we access something in db we use try catch block

router.post("/register", async (req, res) => {
  try {

    const { firstName, lastName, email, password } = req.body;

    // Validate input 
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    } // validate on the frontend for each specfic field

    // Check if user already exists
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new Users({
      firstName,
      lastName,
      email,
      password: hashedPassword, // Save the hashed password
    });

    // Save the user in the database
    await newUser.save();

    // Send success response
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});



// login route api

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Send success response with the user ID
    res.status(200).json({ message: "Login successful", userId: user._id ,firstName:user.firstName,lastName:user.lastName,email:user.email});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Add Task Route
router.post('/task', async (req, res) => {
  try {
    const { title, description, dueDate, priority, tag, status, userID } = req.body;
    const newTask = new Tasks({
      title,
      description,
      dueDate,
      priority,
      tag,
      status,
      userID
    });

    const savedTask = await newTask.save(); 
    res.status(201).json(savedTask); 
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Server error" });
  }
});

router.get('/task', async (req, res) => {
  try {
    const tasks = await Tasks.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


router.get('/tasks/completed/:userId', async (req, res) => {
  try {
    // Access the userId from req.params
    const { userId } = req.params;
    const completedTasks = await Tasks.find({ status: 'completed', userId });
    res.status(200).json(completedTasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


export default router;






