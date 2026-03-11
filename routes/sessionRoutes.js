import express from "express";
import { createSession, getLessonSessions } from "../controllers/sessionController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { mentorOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, mentorOnly, createSession);

router.get("/lessons/:id/sessions", authMiddleware, getLessonSessions);

export default router;