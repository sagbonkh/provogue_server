const knex = require("knex")(require("../knexfile"));

const getProjects = async (_req, res) => {
  try {
    const data = await knex("projects")
      .join("tailors", "projects.tailor_id", "=", "tailors.id")
      .join("client", "projects.client_id", "=", "client.id")
      .select(
        "projects.id as project_id",
        "projects.name as project_name",
        "projects.description",
        "projects.status",
        "projects.start_date",
        "projects.end_date",
        "projects.cost",
        "projects.payment_status",
        "tailors.id as tailor_id",
        "tailors.name as tailor_name",
        "client.id as client_id",
        "client.name as client_name"
      );
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving Projects: ${err}`);
  }
};

const singleProject = async (req, res) => {
  try {
    const projectFound = await knex("projects")
      .select(
        "projects.id as project_id",
        "projects.name as project_name",
        "projects.description",
        "projects.status",
        "projects.start_date",
        "projects.end_date",
        "projects.cost",
        "projects.payment_status",
        "tailors.id as tailor_id",
        "tailors.name as tailor_name",
        "client.id as client_id",
        "client.name as client_name"
      )
      .join("tailors", "projects.tailor_id", "=", "tailors.id")
      .join("client", "projects.client_id", "=", "client.id")
      .where("projects.id", "=", req.params.id);
    if (projectFound.length === 0) {
      return res.status(404).json({
        message: `Project with ID ${req.params.id} not found`,
      });
    }

    const projectData = projectFound[0];
    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json({
      message: `Unable to retrieve Project data for project with ID ${req.params.id}`,
    });
  }
};

const remove = async (req, res) => {
  try {
    // Delete the project from the database
    const rowsDeleted = await knex("projects")
      .where({ id: req.params.id })
      .delete();

    // Check if any rows were deleted
    if (rowsDeleted === 0) {
      // If no rows were deleted, return a 404 status with a message indicating that the project was not found
      return res
        .status(404)
        .json({ message: `Project with ID ${req.params.id} not found` });
    }

    // If the deletion is successful, return a 200 status with a success message
    res.status(200).json({
      message: `Project with ID ${req.params.id} deleted successfully`,
    });
  } catch (error) {
    // Handle database deletion errors
    res.status(500).json({ message: `Unable to delete project: ${error}` });
  }
};

const addNew = async (req, res) => {
  // Validate request body properties
  const projectId = req.params.id;
  if (
    !req.body.name ||
    !req.body.description ||
    !req.body.status ||
    !req.body.start_date ||
    !req.body.end_date ||
    !req.body.payment_status ||
    !req.body.client_id ||
    !req.body.tailor_id
  ) {
    return res.status(400).json({
      message: "Missing properties in the request body",
    });
  }

  try {
    // Insert the new project into the database
    const [newProjectId] = await knex("projects").insert(req.body);

    // Fetch the newly created project data
    const createdProject = await knex("projects")
      .where({ id: newProjectId })
      .first();

    // Return the newly created project data in the response
    return res.status(201).json(createdProject);
  } catch (error) {
    // Handle database insertion errors
    console.error("Error creating new project:", error);
    return res.status(500).json({
      message: "Unable to create new project",
    });
  }
};

const editProject = async (req, res) => {
  const projectId = req.params.id;

  // Validate request body properties
  if (
    !req.body.name ||
    !req.body.description ||
    !req.body.status ||
    !req.body.start_date ||
    !req.body.end_date ||
    !req.body.cost ||
    !req.body.payment_status ||
    !req.body.client_id ||
    !req.body.tailor_id
  ) {
    return res.status(400).json({
      message: "Missing properties in the request body",
    });
  }

  try {
    // Remove 'created_at' from the request body
    delete req.body.created_at;
    delete req.body.updated_at;

    // Update the project in the database
    await knex("projects").where({ id: req.params.id }).update(req.body);

    // Fetch the updated project data
    const updatedProject = await knex("projects").where({ id: req.params.id });

    // Return the updated project data in the response
    return res.status(200).json(updatedProject);
  } catch (error) {
    // Handle database update errors
    console.error("Error updating project:", error);
    return res.status(500).json({
      message: "Unable to update project",
    });
  }
};

const getTailorsProjects = async (req, res) => {
  try {
    const tailorsProjectsFound = await knex("projects")
      .select(
        "projects.id as project_id",
        "projects.name as project_name",
        "projects.description",
        "projects.status",
        "projects.start_date",
        "projects.end_date",
        "projects.cost",
        "projects.payment_status",
        "tailors.id as tailor_id",
        "tailors.name as tailor_name",
        "client.id as client_id",
        "client.name as client_name"
      )
      .join("tailors", "projects.tailor_id", "=", "tailors.id")
      .join("client", "projects.client_id", "=", "client.id")
      .where("projects.tailor_id", "=", req.params.id);

    // Check if any projects were found for the tailor
    if (tailorsProjectsFound.length === 0) {
      return res.status(404).json({
        message: `No projects found for tailor with ID ${req.params.id}`,
      });
    }

    // Send the found projects directly in the response
    res.json(tailorsProjectsFound);
  } catch (error) {
    // Handle database retrieval errors
    res.status(500).json({
      message: `Unable to retrieve tailor project data for tailor with ID ${req.params.id}`,
    });
  }
};

const getClientsProjects = async (req, res) => {
  try {
    const clientProjectsFound = await knex("projects")
      .select(
        "projects.id as project_id",
        "projects.name as project_name",
        "projects.description",
        "projects.status",
        "projects.start_date",
        "projects.end_date",
        "projects.cost",
        "projects.payment_status",
        "tailors.id as tailor_id",
        "tailors.name as tailor_name",
        "client.id as client_id",
        "client.name as client_name"
      )
      .join("tailors", "projects.tailor_id", "=", "tailors.id")
      .join("client", "projects.client_id", "=", "client.id")
      .where({
        client_id: req.params.id,
      });
    // Check if any projects were found for the tailor
    if (clientProjectsFound.length === 0) {
      return res.status(404).json({
        message: `No projects found for client with ID ${req.params.id}`,
      });
    }

    // Send the found projects directly in the response
    res.json(clientProjectsFound);
  } catch (error) {
    // Handle database retrieval errors
    res.status(500).json({
      message: `Unable to retrieve project data for client with ID ${req.params.id}`,
    });
  }
};

module.exports = {
  getProjects,
  addNew,
  editProject,
  singleProject,
  remove,
  getTailorsProjects,
  getClientsProjects,
};
