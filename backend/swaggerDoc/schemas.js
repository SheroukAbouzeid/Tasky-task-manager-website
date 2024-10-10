/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *       properties:
 *         firstName:
 *           type: string
 *           description: The user's first name
 *         lastName:
 *           type: string
 *           description: The user's last name
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - priority
 *         - tag
 *         - userID
 *       properties:
 *         title:
 *           type: string
 *           description: The task title
 *           example: "Complete project report"
 *         description:
 *           type: string
 *           description: The task description
 *           example: "Write and finalize the project report for the client"
 *         dueDate:
 *           type: string
 *           format: date
 *           description: The due date of the task
 *           example: "2024-10-20"
 *         priority:
 *           type: string
 *           description: The priority of the task
 *           enum: ["high", "mid", "low"]
 *           example: "high"
 *         tag:
 *           type: string
 *           description: The task tag
 *           enum: ["work", "school", "home", "project", "health", "sports"]
 *           example: "work"
 *         status:
 *           type: string
 *           description: The task status
 *           enum: ["inprogress", "completed"]
 *           default: "inprogress"
 *           example: "inprogress"
 *         userID:
 *           type: string
 *           description: The ID of the user assigned to the task
 *           example: "12345"
 *         steps:
 *           type: array
 *           description: List of steps for the task
 *           items:
 *             type: object
 *             properties:
 *               stepName:
 *                 type: string
 *                 description: Name of the step
 *                 example: "Research"
 *               isComplete:
 *                 type: boolean
 *                 description: Indicates if the step is completed
 *                 example: false
 */

