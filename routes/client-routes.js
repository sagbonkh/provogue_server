const router = require("express").Router();
const clientController = require("../controllers/client-controller");

router.route("/").get(clientController.allClients).post(clientController.add);

router
  .route("/client/:id")
  .get(clientController.singleClient)
  .put(clientController.update)
  .delete(clientController.remove);

module.exports = router;
