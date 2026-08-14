import { Router } from "express";
import verifyToken from "../middleware/auth.js";

const router = Router();

// ==========================================
//  GET /protected/profile — User profile data
//  Uses verifyToken middleware for auth
// ==========================================
router.get("/profile", verifyToken, (req, res) => {
  return res.status(200).json({
    message: "Profile retrieved successfully",
    user: {
      id: req.user.id,
      email: req.user.email,
      created_at: req.user.created_at,
    },
  });
});

// ==========================================
//  GET /protected/dashboard — Dashboard data
//  Uses verifyToken middleware for auth
// ==========================================
router.get("/dashboard", verifyToken, (req, res) => {
  return res.status(200).json({
    message: "Welcome to your dashboard",
    user: {
      id: req.user.id,
      email: req.user.email,
    },
    dashboard: {
      last_sign_in: req.user.last_sign_in_at,
      role: req.user.role,
    },
  });
});
// ==========================================
//  GET /protected/admin — Admin-only data
//  Uses verifyToken middleware for auth
// ==========================================
router.get("/admin", verifyToken, (req, res) => {
  return res.status(200).json({
    message: "Welcome, admin! Here are the server stats.",
    admin: {
      user_id: req.user.id,
      email: req.user.email,
      role: req.user.role || "authenticated",
    },
    server: {
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      node_version: process.version,
    },
  });
});

export default router;
