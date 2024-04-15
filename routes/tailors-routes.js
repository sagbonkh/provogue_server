const router = require("express").Router();
const tailorController = require("../controllers/tailors-controller");

router
  .route("/tailors")
  .get(tailorController.allTailors)
  .post(tailorController.add);
router.route("/tailors/login").post(tailorController.login);

router
  .route("/tailors/:id")
  .get(tailorController.singleTailor)
  .put(tailorController.update)
  .delete(tailorController.remove);

router
  .route("/tailors/:id/clients")
  .get(tailorController.getTailorsClients)
  .delete(tailorController.remove);

module.exports = router;
