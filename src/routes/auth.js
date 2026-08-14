import { Router } from "express";
import supabase from "../config/supabase.js";
import verifyToken from "../middleware/auth.js";

const router = Router();

// Simple email format validation
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// ==========================================
//  POST /auth/signup — Register a new user
// ==========================================
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        error: "Invalid email format",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: "Password must be at least 6 characters",
      });
    }

    // Register user with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(201).json({
      message: "User created successfully",
      user: data.user,
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// ==========================================
//  POST /auth/login — Authenticate user
// ==========================================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        error: "Invalid email format",
      });
    }

    // Sign in with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ error: "Invalid login credentials" });
    }

    return res.status(200).json({
      message: "Login successful",
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      user: data.user,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// ==========================================
//  POST /auth/logout — Terminate user session
//  Protected: requires valid Bearer token
// ==========================================
router.post("/logout", verifyToken, async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut(req.token);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(204).send();
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

