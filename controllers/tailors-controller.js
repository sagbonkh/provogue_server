const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

// Get all tailors
const allTailors = async (_req, res) => {
  try {
    const data = await knex("tailors");
    res.status(200).json(data);
  } catch (err) {
    res
      .status(400)
      .json({ message: `Error retrieving tailors: ${err.message}` });
  }
};

// Get a single tailor
const singleTailor = async (req, res) => {
  try {
    const tailorFound = await knex("tailors")
      .where({ id: req.params.id })
      .first();
    if (!tailorFound) {
      return res.status(404).json({
        message: `Tailor with ID ${req.params.id} not found`,
      });
    }
    res.status(200).json(tailorFound);
  } catch (err) {
    res.status(500).json({
      message: `Unable to retrieve tailor data for tailor with ID ${req.params.id}: ${err.message}`,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await knex("tailors").where({ email }).first();
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Token creation
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: { email: user.email, id: user.id },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Add a new tailor
const add = async (req, res) => {
  const { name, email, phone, password } = req.body;

  // Validate request body
  if (!name || !email || !phone || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  // Validate email format
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [newTailorId] = await knex("tailors").insert({
      ...req.body,
      password: hashedPassword,
    });

    const createdTailor = await knex("tailors")
      .where({ id: newTailorId })
      .first();
    res.status(201).json(createdTailor);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new tailor: ${error.message}`,
    });
  }
};

// Update a tailor
const update = async (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !phone || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  try {
    const rowsUpdated = await knex("tailors")
      .where({ id: req.params.id })
      .update(req.body);

    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `Tailor with ID ${req.params.id} not found`,
      });
    }

    const updatedTailor = await knex("tailors")
      .where({ id: req.params.id })
      .first();
    res.status(200).json(updatedTailor);
  } catch (error) {
    res.status(500).json({
      message: `Unable to update tailor with ID ${req.params.id}: ${error.message}`,
    });
  }
};

// Delete a tailor
const remove = async (req, res) => {
  const tailorId = req.params.id;
  try {
    const rowsDeleted = await knex("tailors").where({ id: tailorId }).delete();
    if (rowsDeleted === 0) {
      return res.status(404).json({
        message: `Tailor with ID ${tailorId} not found`,
      });
    }
    res.status(200).json({
      message: `Tailor with ID ${tailorId} deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete tailor with ID ${tailorId}: ${error.message}`,
    });
  }
};

// Get all clients associated with a tailor
const getTailorsClients = async (req, res) => {
  try {
    const clients = await knex("client").where({ tailor_id: req.params.id });
    if (clients.length === 0) {
      return res.status(404).json({
        message: `No clients found for tailor with ID ${req.params.id}`,
      });
    }
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve clients for tailor with ID ${req.params.id}: ${error.message}`,
    });
  }
};

module.exports = {
  allTailors,
  singleTailor,
  add,
  update,
  remove,
  getTailorsClients,
  login,
};
