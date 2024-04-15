const router = require("express").Router();
const appointmentController = require("../controllers/appointment-controller");

router
  .route("/appointments")
  .get(appointmentController.getAll)
  .post(appointmentController.addNew);

router
  .route("/appointments/:id")
  .get(appointmentController.getOne)
  .delete(appointmentController.remove);

router
  .route("/client/:id/appointment")
  .get(appointmentController.getClientAppointments)
  .delete(appointmentController.remove);

module.exports = router;
