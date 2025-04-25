const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes"); // Import API routes

dotenv.config();

const connectDB = require("./config/db");
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount API routes
app.use('/api/auth', authRoutes);

app.get("/", (req, res) => {
  res.send("Awaaz Portal Backend Running ✅");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
