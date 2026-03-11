import express from "express";
import { summarize } from "../controllers/llmController.js";

const router = express.Router();

router.post("/summarize", summarize);

export default router;