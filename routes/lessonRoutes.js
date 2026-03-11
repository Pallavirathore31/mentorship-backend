import express from "express";
import { createLesson, getLessons } from "../controllers/lessonController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { mentorOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, mentorOnly, createLesson);

router.get("/", authMiddleware, getLessons);

export default router;