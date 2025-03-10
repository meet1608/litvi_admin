import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Admin from "../models/Admin.js"; // Import Admin model

dotenv.config();
const router = express.Router();

// Login Route (Without Password Hashing)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email, password }); // Direct match (no hashing)
    if (!admin) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: admin.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
