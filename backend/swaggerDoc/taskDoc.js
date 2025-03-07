/**
 * @swagger
 * /api/addTask:
 *   post:
 *     summary: Create a new task
 *     tags: [Task]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the task
 *                 example: "Complete project report"
 *               description:
 *                 type: string
 *                 description: Description of the task
 *                 example: "Write and finalize the project report for the client"
 *               dueDate:
 *                 type: string
 *                 description: Due date of the task
 *                 example: "2024-10-20"
 *               priority:
 *                 type: string
 *                 enum: ["high", "mid", "low"]
 *                 description: Priority level of the task
 *                 example: "high"
 *               tag:
 *                 type: string
 *                 enum: ["work", "school", "home", "project", "health", "sports"]
 *                 description: Tag for the task category
 *                 example: "work"
 *               status:
 *                 type: string
 *                 enum: ["inprogress", "completed"]
 *                 description: Status of the task
 *                 example: "inprogress"
 *               userID:
 *                 type: string
 *                 description: ID of the user who owns the task
 *                 example: "12345"
 *               steps:
 *                 type: array
 *                 description: List of steps for the task
 *                 items:
 *                   type: object
 *                   properties:
 *                     stepName:
 *                       type: string
 *                       description: Name of the step
 *                       example: "Research"
 *                     isComplete:
 *                       type: boolean
 *                       description: Completion status of the step
 *                       example: false
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/updateTask/{taskId}:
 *   put:
 *     summary: Update an existing task
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the task to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the task
 *                 example: "Update project report"
 *               description:
 *                 type: string
 *                 description: Description of the task
 *                 example: "Review and edit the project report for accuracy"
 *               dueDate:
 *                 type: string
 *                 description: Due date of the task
 *                 example: "2024-11-15"
 *               priority:
 *                 type: string
 *                 enum: ["high", "mid", "low"]
 *                 description: Priority level of the task
 *                 example: "mid"
 *               tag:
 *                 type: string
 *                 enum: ["work", "school", "home", "project", "health", "sports"]
 *                 description: Tag for the task category
 *                 example: "project"
 *               status:
 *                 type: string
 *                 enum: ["inprogress", "completed"]
 *                 description: Status of the task
 *                 example: "completed"
 *               steps:
 *                 type: array
 *                 description: List of steps for the task
 *                 items:
 *                   type: object
 *                   properties:
 *                     stepName:
 *                       type: string
 *                       description: Name of the step
 *                       example: "Editing"
 *                     isComplete:
 *                       type: boolean
 *                       description: Completion status of the step
 *                       example: true
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/getTasks/{userId}:
 *   get:
 *     summary: Get tasks for a specific user
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user whose tasks you want to retrieve
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 0
 *         required: false
 *         description: The maximum number of tasks to return. Defaults to 0, which means no limit.
 *     responses:
 *       200:
 *         description: Returns a list of tasks for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       404:
 *         description: No tasks found for the user
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/getCompletedTasks:
 *   get:
 *     summary: Get completed tasks for a user
 *     tags: [Task]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to fetch completed tasks for
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 0
 *         required: false
 *         description: The maximum number of tasks to return. Defaults to 0, which means no limit.
 *     responses:
 *       200:
 *         description: Returns a list of completed tasks for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       404:
 *         description: No completed tasks found for the user
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/getInProgressTasks:
 *   get:
 *     summary: Get in-progress tasks for a user
 *     tags: [Task]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to fetch in-progress tasks for
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 0
 *         required: false
 *         description: The maximum number of tasks to return. Defaults to 0, which means no limit.
 *     responses:
 *       200:
 *         description: Returns a list of in-progress tasks for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       404:
 *         description: No in-progress tasks found for the user
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /api/deleteTask/{taskId}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the task to delete
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/getTask/{taskId}:
 *   get:
 *     summary: Retrieve a specific task by ID
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the task to retrieve
 *     responses:
 *       200:
 *         description: Task retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The ID of the task
 *                   example: "64a85c5f9cb4d25b348cb896"
 *                 title:
 *                   type: string
 *                   description: The title of the task
 *                   example: "Write project report"
 *                 description:
 *                   type: string
 *                   description: The description of the task
 *                   example: "Complete the project report for the client"
 *                 dueDate:
 *                   type: string
 *                   description: Due date of the task
 *                   example: "2024-10-21"
 *                 priority:
 *                   type: string
 *                   description: Priority level of the task
 *                   example: "high"
 *                 tag:
 *                   type: string
 *                   description: Tag for the task category
 *                   example: "work"
 *                 status:
 *                   type: string
 *                   description: Current status of the task
 *                   example: "inprogress"
 *                 steps:
 *                   type: array
 *                   description: List of steps for the task
 *                   items:
 *                     type: object
 *                     properties:
 *                       stepName:
 *                         type: string
 *                         description: Name of the step
 *                         example: "Initial Draft"
 *                       isComplete:
 *                         type: boolean
 *                         description: Completion status of the step
 *                         example: false
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
