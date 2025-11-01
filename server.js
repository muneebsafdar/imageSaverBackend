import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";

dotenv.config();
const app = express();

// ✅ Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173", 
      "https://myimagesaver.netlify.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Connect DB
connectDB();

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/images", imageRoutes);

// ✅ Default route (optional)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
