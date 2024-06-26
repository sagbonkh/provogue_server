const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");
const validator = require("validator");

// get all clients
const allClients = async (_req, res) => {
  try {
    const data = await knex("client");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving clients: ${err}`);
  }
};

const singleClient = async (req, res) => {
  try {
    const clientFound = await knex("client").where({ id: req.params.id });
    if (clientFound.length === 0) {
      return res.status(404).json({
        message: `Client with ID ${req.params.id} not found`,
      });
    }

    // Send the found client data in the response
    res.status(200).json(clientFound[0]);
  } catch (err) {
    res.status(500).json({
      message: `Unable to retrieve Client data for Client with ID ${req.params.id}`,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await knex("client").where({ email }).first();
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      message: "Login successful",
      user: { email: user.email, id: user.id },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

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
    const [newClientId] = await knex("client").insert({
      ...req.body,
      password: hashedPassword,
    });

    const createdClient = await knex("client")
      .where({ id: newClientId })
      .first();
    res.status(201).json(createdClient);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new client: ${error.message}`,
    });
  }
};

const update = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.phone ||
    !req.body.password
  ) {
    return res.status(400).json({
      message: "Missing properties in the request body",
    });
  }

  const email = req.body.email; // Use req.body.email instead of req.body.contact_email
  if (!email.includes("@") || !email.includes(".com")) {
    // Correct email validation condition
    return res.status(400).json({ error: "Invalid email address" });
  }

  try {
    const rowsUpdated = await knex("client")
      .where({ id: req.params.id })
      .update(req.body);

    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `Client with ID ${req.params.id} not found`,
      });
    }

    const updatedClient = await knex("client").where({
      id: req.params.id,
    });

    res.json(updatedClient[0]);
  } catch (error) {
    res.status(500).json({
      message: `Unable to update client with ID ${req.params.id}: ${error}`,
    });
  }
};

const remove = async (req, res) => {
  const clientId = req.params.id;

  try {
    const ordersDeleted = await knex("order")
      .where({ client_id: clientId })
      .delete();

    const rowsDeleted = await knex("client").where({ id: clientId }).delete();

    if (rowsDeleted === 0) {
      return res
        .status(404)
        .json({ message: `No orders found for client with ID ${clientId}` });
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete client and its order: ${error}`,
    });
  }
};

module.exports = {
  allClients,
  singleClient,
  add,
  update,
  remove,
  login,
};
