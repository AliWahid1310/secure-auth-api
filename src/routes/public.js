import { Router } from "express";

const router = Router();

// ==========================================
//  GET /public/info — Public, no auth needed
// ==========================================
router.get("/info", (req, res) => {
  return res.status(200).json({
    message: "Welcome stranger! This info is public.",
    api: "Secure Auth API",
    version: "1.0.0",
    documentation: "/docs",
  });
});

export default router;
