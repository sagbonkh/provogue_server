const knex = require("knex")(require("../knexfile"));

const getAll = async (_req, res) => {
  try {
    const data = await knex("order")
      .join("client", "order.client_id", "=", "client.id")
      .join("tailors", "order.tailor_id", "=", "tailors.id")
      .select(
        "order.id as order_id",
        "client.name as client_name",
        "client.id as client_id",
        "tailors.id as tailor_id",
        "tailors.name as tailor_name",
        "order.description",
        "order.due_date",
        "order.service",
        "order.order_date",
        "order.status"
      );
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send(`Error retrieving Orders: ${err}`);
  }
};
const editOrder = async (req, res) => {
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({
      message: "Missing required properties in the request body",
    });
  }
  try {
    // Remove 'created_at' from the request body
    delete req.body.created_at;
    delete req.body.updated_at;

    // Update the project in the database
    await knex("order").where({ id: req.params.id }).update(req.body);

    // Fetch the updated project data
    const updatedOrder = await knex("order").where({ id: req.params.id });

    // Return the updated project data in the response
    return res.status(200).json(updatedOrder);
  } catch (error) {
    // Handle database update errors
    console.error("Error updating order:", error);
    return res.status(500).json({
      message: "Unable to update project",
    });
  }
};
const getOne = async (req, res) => {
  try {
    const orderFound = await knex("order")
      .select(
        "order.id as order_id",
        "client.name as client_name",
        "client.id as client_id",
        "tailors.id as tailor_id",
        "tailors.name as tailor_name",
        "order.service",
        "order.order_date",
        "order.description",
        "order.due_date",
        "order.status"
      )
      .join("client", "order.client_id", "=", "client.id")
      .join("tailors", "order.tailor_id", "=", "tailors.id")
      .where("order.id", req.params.id); // Simplified, no need for "="

    if (orderFound.length === 0) {
      return res.status(404).json({
        message: `Order with ID ${req.params.id} not found`,
      });
    }
    const orderData = orderFound[0]; // Correct variable name
    res.status(200).json(orderData);
  } catch (err) {
    res.status(500).json({
      message: `Unable to retrieve Order data for order with ID ${req.params.id}: ${err.message}`,
    });
  }
};

const remove = async (req, res) => {
  try {
    const rowsDeleted = await knex("order")
      .where({ id: req.params.id })
      .delete();
    if (rowsDeleted === 0) {
      return res
        .status(404)
        .json({ message: `Order with ID ${req.params.id} not found` });
    }

    // No Content response
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete Order: ${error}`,
    });
  }
};

const addNew = async (req, res) => {
  const { service, client_id, tailor_id, due_date, description } = req.body;
  if (!service || !client_id || !tailor_id || !due_date || !description) {
    return res.status(400).json({
      message: "Missing required properties in the request body",
    });
  }
  try {
    const [newOrderId] = await knex("order").insert(req.body);
    const createdOrder = await knex("order").where({ id: newOrderId }).first();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new order: ${error.message}`,
    });
  }
};

const getClientOrders = async (req, res) => {
  try {
    const data = await knex("order")
      .join("client", "order.client_id", "=", "client.id")
      .join("tailors", "order.tailor_id", "=", "tailors.id")
      .select(
        "order.id as order_id",
        "client.name as client_name",
        "client.id as client_id",
        "client.email as client_email",
        "client.phone as client_phone",
        "tailors.id as tailor_id",
        "tailors.name as tailor_name",
        "order.description",
        "order.due_date",
        "order.service",
        "order.order_date",
        "order.status"
      )
      .where({
        client_id: req.params.id,
      });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve orders for client with ID ${req.params.id}: ${error.message}`,
    });
  }
};

const getTailorsOrders = async (req, res) => {
  try {
    const data = await knex("order")
      .join("client", "order.client_id", "=", "client.id")
      .join("tailors", "order.tailor_id", "=", "tailors.id")
      .select(
        "order.id as order_id",
        "client.name as client_name",
        "client.id as client_id",
        "client.email as client_email",
        "client.phone as client_phone",
        "tailors.id as tailor_id",
        "tailors.name as tailor_name",
        "order.description",
        "order.due_date",
        "order.service",
        "order.order_date",
        "order.status"
      )
      .where({
        tailor_id: req.params.id,
      });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve orders for tailor with ID ${req.params.id}: ${error.message}`,
    });
  }
};

module.exports = {
  getAll,
  addNew,
  getOne,
  remove,
  getClientOrders,
  getTailorsOrders,
  editOrder,
};
