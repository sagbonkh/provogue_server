const router = require("express").Router();
const orderController = require("../controllers/order-controller");

router
  .route("/orders")
  .get(orderController.getAll)
  .post(orderController.addNew);
router
  .route("/orders/:id")
  .delete(orderController.remove)
  .get(orderController.getOne)
  .put(orderController.editOrder);

router
  .route("/client/:id/orders")
  .get(orderController.getClientOrders)
  .delete(orderController.remove);

router
  .route("/tailors/:id/orders")
  .get(orderController.getTailorsOrders)
  .delete(orderController.remove);

module.exports = router;
