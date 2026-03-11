import express from "express";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";
import swaggerSpec from "./config/swagger.js";
import swaggerUi from "swagger-ui-express";
import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import lessonRoutes from "./routes/lessonRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import llmRoutes from "./routes/llmRoutes.js";
import rateLimit from "express-rate-limit";


const app = express();

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10
});
app.use(express.json());
app.use(limiter);

connectDB();

app.get("/", (req, res) => {
  res.send("Mentorship Backend Running");
});

app.use("/auth", authRoutes);
app.use("/students", studentRoutes);
app.use("/lessons", lessonRoutes);
app.use("/bookings", bookingRoutes);
app.use("/sessions", sessionRoutes);
app.use("/llm", llmRoutes);
app.use("/llm", limiter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

