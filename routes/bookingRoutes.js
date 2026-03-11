import express from "express";
import { createBooking } from "../controllers/bookingController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { parentOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, parentOnly, createBooking);

export default router;