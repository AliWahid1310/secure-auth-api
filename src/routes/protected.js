import { Router } from "express";
import supabase from "../config/supabase.js";

const router = Router();

// ==========================================
//  GET /protected/profile — Requires verified Bearer token
// ==========================================
router.get("/profile", async (req, res) => {
  try {
    // Extract the Authorization header
    const authHeader = req.headers.authorization;

    // Check if the header exists and follows "Bearer <token>" format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Access token required" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Access token required" });
    }

    // Verify the token with Supabase
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    // Token is valid — return user profile data
    return res.status(200).json({
      message: "Profile retrieved successfully",
      user: {
        id: data.user.id,
        email: data.user.email,
        created_at: data.user.created_at,
      },
    });
  } catch (err) {
    console.error("Profile error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
