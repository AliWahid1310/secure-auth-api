import { Router } from "express";

const router = Router();

// ==========================================
//  GET /protected/profile — Requires Bearer token
// ==========================================
router.get("/profile", (req, res) => {
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

  // For now, just confirm the token was received (verification comes in Stage 3)
  return res.status(200).json({
    message: "Token received (not yet verified)",
    token_preview: token.substring(0, 20) + "...",
  });
});

export default router;
