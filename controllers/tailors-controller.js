const knex = require("knex")(require("../knexfile"));

// get all tailors
const allTailors = async (_req, res) => {
  try {
    const data = await knex("tailors");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving tailors: ${err}`);
  }
};

const singleTailor = async (req, res) => {
  try {
    const tailorFound = await knex("tailors").where({ id: req.params.id });
    if (tailorFound.length === 0) {
      return res.status(404).json({
        message: `Tailor with ID ${req.params.id} not found`,
      });
    }

    // Send the found tailor data in the response
    res.status(200).json(tailorFound[0]);
  } catch (err) {
    res.status(500).json({
      message: `Unable to retrieve tailor data for tailor with ID ${req.params.id}`,
    });
  }
};

const add = async (req, res) => {
  // Validate request body
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

  // Validate email format
  const email = req.body.email;
  if (!email.includes("@") || !email.includes(".com")) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  try {
    // Insert new tailor into the database
    const [newTailorId] = await knex("tailors").insert(req.body);

    // Fetch the newly created tailor data
    const createdTailor = await knex("tailors")
      .where({ id: newTailorId })
      .first();

    // Return the newly created tailor data in the response
    res.status(201).json(createdTailor);
  } catch (error) {
    // Handle database insertion errors
    res.status(500).json({
      message: `Unable to create new tailor: ${error}`,
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
    return res.status(400).json({ error: "Invalid email address" });
  }

  try {
    // Update the tailor information in the database
    const rowsUpdated = await knex("tailors")
      .where({ id: req.params.id })
      .update(req.body);

    // Check if any rows were updated
    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `Tailor with ID ${req.params.id} not found`,
      });
    }

    // Fetch the updated tailor data
    const updatedTailor = await knex("tailors")
      .where({ id: req.params.id })
      .first();

    // Send the updated tailor data in the response
    res.status(200).json(updatedTailor);
  } catch (error) {
    res.status(500).json({
      message: `Unable to update tailor with ID ${req.params.id}: ${error}`,
    });
  }
};

const remove = async (req, res) => {
  const tailorId = req.params.id;

  try {
    // Delete all projects associated with the tailor
    await knex("projects").where({ tailor_id: tailorId }).delete();

    // Delete the tailor
    const rowsDeleted = await knex("tailors").where({ id: tailorId }).delete();

    // Check if the tailor was found and deleted
    if (rowsDeleted === 0) {
      return res
        .status(404)
        .json({ message: `Tailor with ID ${tailorId} not found` });
    }

    // Send a success response indicating the deletion of the tailor and associated projects
    res.status(200).json({
      message: `Tailor with ID ${tailorId} and associated projects deleted successfully`,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      message: `Unable to delete tailor and its projects: ${error}`,
    });
  }
};

module.exports = {
  allTailors,
  singleTailor,
  add,
  update,
  remove,
};
