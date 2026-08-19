require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/auth");
const voteRoutes = require("./routes/vote.js");

const app = express();

// Rate limiter
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: "Too many login attempts, try again later" }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

// Rate limit login route
app.use("/api/auth/login", loginLimiter);

// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", voteRoutes);

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
