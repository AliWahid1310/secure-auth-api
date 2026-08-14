import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import supabase from "./config/supabase.js";
import authRoutes from "./routes/auth.js";
import publicRoutes from "./routes/public.js";
import protectedRoutes from "./routes/protected.js";

dotenv.config();

// Load swagger.json using ES module compatible path resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const swaggerDocument = JSON.parse(
  readFileSync(join(__dirname, "swagger.json"), "utf-8")
);

const app = express();
const PORT = process.env.PORT || 3000;

// --------------- Middleware ---------------
app.use(cors());
app.use(express.json());

// --------------- Swagger UI Documentation ---------------
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Secure Auth API — Docs",
    swaggerOptions: {
      persistAuthorization: true,
    },
  })
);

// --------------- Health Check ---------------
app.get("/", (req, res) => {
  res.status(200).json({ message: "Secure Auth API is running" });
});

// --------------- Routes ---------------
app.use("/auth", authRoutes);
app.use("/public", publicRoutes);
app.use("/protected", protectedRoutes);

// --------------- Start Server ---------------
app.listen(PORT, () => {
  console.log(`Server running and connected to Supabase on port ${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/docs`);
});
