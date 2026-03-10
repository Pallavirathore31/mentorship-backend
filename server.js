import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import swaggerSpec from "./config/swagger.js";
import swaggerUi from "swagger-ui-express";
import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Mentorship Backend Running");
});

app.use("/auth", authRoutes);
app.use("/students", studentRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

