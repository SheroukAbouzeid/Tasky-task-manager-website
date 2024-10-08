import Tasks from "../schema/TaskSchema.js";


//--------------------------------------------addTask--------------------------------------------
export const addTask = async (req, res) => {
  try {
    const {
      title,
      description,
      dueDate,
      priority,
      tag,
      status,
      userID,
      steps,
    } = req.body;

    const newTask = new Tasks({
      title,
      description,
      dueDate,
      priority,
      tag,
      status,
      userID,
      steps, // Including steps array
    });
    if (!newTask) {
      return res.status(400).json({ message: "Invalid task data" });}

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Server error" });
  }
};

//--------------------------------------------getUserTasks--------------------------------------------

export const getUserTasks = async (req, res) => {
  const { userId } = req.params; // Assuming userId is passed as a route parameter
  const limit = parseInt(req.query.limit, 10) || 0; // Limit from query, default to 0 (no limit)

  try {
    // Find tasks for the given userId with the specified limit
    const tasks = await Tasks.find({ userID: userId }).limit(limit);

    // Check if the user has any tasks
    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found for this user." });
    }

    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


//--------------------------------------------getCompletedTasks--------------------------------------------


export const getCompletedTasks = async (req, res) => {
  const { userId } = req.query;
  const limit = parseInt(req.query.limit, 10) || 0;

  try {
    const completedTasks = await Tasks.find({
      userID: userId,
      status: "completed",
    }).limit(limit);

    if (completedTasks.length === 0) {
      return res
        .status(404)
        .json({ message: "No completed tasks found for this user." });
    }

    res.status(200).json(completedTasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//--------------------------------------------getInProgressTasks--------------------------------------------

export const getInProgressTasks = async (req, res) => {
  const { userId } = req.query;
  const limit = parseInt(req.query.limit, 10) || 0;

  try{
    const inProgressTasks = await Tasks.find({
      userID: userId,
      status: "inprogress",
    }).limit(limit);

    if (inProgressTasks.length === 0) {
      return res
        .status(404)
        .json({ message: "No in progress tasks found for this user." });
    }

    res.status(200).json(inProgressTasks);
  }
  catch (error)
  {
    res.status(500).json({ message: error.message });
 
  }
}
//--------------------------------------------deleteTask--------------------------------------------

export const deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const deletedTask = await Tasks.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found." });
    }

    res.status(200).json({ message: "Task deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
