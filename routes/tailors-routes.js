const router = require("express").Router();
const tailorController = require("../controllers/tailors-controller");

router.route("/").get(tailorController.allTailors).post(tailorController.add);

router
  .route("/tailors/:id")
  .get(tailorController.singleTailor)
  .put(tailorController.update)
  .delete(tailorController.remove);

module.exports = router;