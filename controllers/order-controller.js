const knex = require("knex")(require("../knexfile"));

const getAll = async (_req, res) => {
  try {
    const data = await knex("order")
      .join("client", "order.client_id", "=", "client.id")
      .select(
        "order.id",
        "client.name",
        "order.service",
        "order.order_date",
        "order.status"
      );
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving Orders: ${err}`);
  }
};

const getOne = async (req, res) => {
  try {
    const orderFound = await knex("order")
      .select(
        "order.id",
        "client.name",
        "order.service",
        "order.order_date",
        "order.status"
      )
      .join("client", "order.client_id", "=", "client.id")
      .where("order.id", "=", req.params.id);
    if (orderFound.length === 0) {
      return res.status(404).json({
        message: `Order with ID ${req.params.id} not found`,
      });
    }
    const orderData = itemFound[0];
    res.status(200).json(orderData);
  } catch (err) {
    res.status(500).json({
      message: `Unable to retrieve Order data for order with ID ${req.params.id}`,
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
  if (!req.body.service || !req.body.status) {
    return res.status(400).json({
      message: "Missing properties in the request body",
    });
  }
  try {
    const result = await knex("order").insert(req.body);

    const newOrderId = result[0];
    const createdItem = await knex("order").where({ id: newOrderId });

    res.status(201).json(createdItem);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new item: ${error}`,
    });
  }
};
const getClientOrders = async (req, res) => {
  try {
    const clientOrdersFound = await knex("orders").where({
      client_id: req.params.id,
    });

    if (clientOrdersFound.length === 0) {
      return res.status(404).json({
        message: `Client with ID ${req.params.id} not found`,
      });
    }

    const clientOrderData = clientOrdersFound;
    res.json(clientOrderData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve client order data for client with ID ${req.params.id}`,
    });
  }
};

module.exports = {
  getAll,
  addNew,
  getOne,
  remove,
  getClientOrders,
};
