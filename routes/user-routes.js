const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// Register endpoint
router.post("/register", async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  // Here add logic to save user to the database
  res.status(201).send({ message: "User registered", username, role });
});

// Login endpoint
router.post("/login", (req, res) => {
  // Authentication logic here
  res.send("Login endpoint");
});

module.exports = router;
