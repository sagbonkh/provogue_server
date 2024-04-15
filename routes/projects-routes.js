const router = require("express").Router();
const projectController = require("../controllers/projects-controller");

router
  .route("/projects")
  .get(projectController.getProjects)
  .post(projectController.addNew);
router
  .route("/projects/:id")
  .delete(projectController.remove)
  .put(projectController.editProject)
  .get(projectController.singleProject);

router
  .route("/tailors/:id/projects")
  .get(projectController.getTailorsProjects)
  .delete(projectController.remove);

module.exports = router;
