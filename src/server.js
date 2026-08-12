import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import supabase from "./config/supabase.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// --------------- Middleware ---------------
app.use(cors());
app.use(express.json());

// --------------- Health Check ---------------
app.get("/", (req, res) => {
  res.status(200).json({ message: "Secure Auth API is running" });
});

// --------------- Start Server ---------------
app.listen(PORT, () => {
  console.log(`Server running and connected to Supabase on port ${PORT}`);
});
