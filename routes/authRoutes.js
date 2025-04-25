const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

// Register Route
router.post("/register", registerUser);

// Login Route
router.post("/login", loginUser);

// Get User Info Route (Protected)
router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
