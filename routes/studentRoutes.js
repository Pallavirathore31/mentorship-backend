import express from "express";
import { createStudent, getStudents } from "../controllers/studentController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { parentOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, parentOnly, createStudent);

router.get("/", authMiddleware, parentOnly, getStudents);

export default router;