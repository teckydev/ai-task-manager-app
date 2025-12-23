import express from "express";
import { signup, login, logout } from "../src/controllers/auth.controller.js";
import { protect } from "../src/middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", protect, logout);

export default router;
