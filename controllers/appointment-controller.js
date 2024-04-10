const knex = require("knex")(require("../knexfile"));

const getAll = async (_req, res) => {
  try {
    const data = await knex("appointments")
      .join("client", "appointments.client_id", "=", "client.id")
      .select(
        "appointments.id",
        "client.name",
        "appointments.appointment_date",
        "appointments.appointment_time",
        "appointments.notes"
      );
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving Appointment: ${err}`);
  }
};

const getOne = async (req, res) => {
  try {
    const appointmentFound = await knex("appointments")
      .select(
        "appointments.id",
        "client.name",
        "appointments.appointment_date",
        "appointments.appointment_time",
        "appointments.notes"
      )
      .join("client", "appointments.client_id", "=", "client.id")
      .where("appointments.id", "=", req.params.id);
    if (appointmentFound.length === 0) {
      return res.status(404).json({
        message: `Appointment with ID ${req.params.id} not found`,
      });
    }
    const appointmentData = itemFound[0];
    res.status(200).json(appointmentData);
  } catch (err) {
    res.status(500).json({
      message: `Unable to retrieve Appointment data for appointment with ID ${req.params.id}`,
    });
  }
};

const remove = async (req, res) => {
  try {
    const rowsDeleted = await knex("appointments")
      .where({ id: req.params.id })
      .delete();
    if (rowsDeleted === 0) {
      return res
        .status(404)
        .json({ message: `Appointment with ID ${req.params.id} not found` });
    }

    // No Content response
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete Appointment: ${error}`,
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
    const result = await knex("appointments").insert(req.body);

    const appointmentId = result[0];
    const createdItem = await knex("appointments").where({ id: appointmentId });

    res.status(201).json(createdItem);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new item: ${error}`,
    });
  }
};
const getClientAppointments = async (req, res) => {
  try {
    const clientAppointmentsFound = await knex("appointments").where({
      client_id: req.params.id,
    });

    if (clientAppointmentsFound.length === 0) {
      return res.status(404).json({
        message: `Appointment with ID ${req.params.id} not found`,
      });
    }

    const clientAppointmentData = clientAppointmentsFound;
    res.json(clientAppointmentData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve client appointment data for client with ID ${req.params.id}`,
    });
  }
};

module.exports = {
  getAll,
  addNew,
  getOne,
  remove,
  getClientAppointments,
};
