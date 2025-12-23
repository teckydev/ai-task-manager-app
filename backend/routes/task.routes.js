import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} from "../src/controllers/task.controller.js";
import { protect } from "../src/middleware/auth.middleware.js";

const router = express.Router();

// All routes protected
router.use(protect);

router.post("/", createTask);          // Create task
router.get("/", getTasks);              // View tasks
router.put("/:id", updateTask);         // Update task
router.delete("/:id", deleteTask);      // Delete task

export default router;
