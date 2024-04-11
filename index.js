const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

const PORT = process.env.PORT || 5050;

app.use(cors());

app.use(express.json());

const appointmentRoutes = require("./routes/appointment-routes");
app.use("/", appointmentRoutes);

const clientRoutes = require("./routes/client-routes");
app.use("/", clientRoutes);

const orderRoutes = require("./routes/order-routes");
app.use("/", orderRoutes);

const tailorsRoutes = require("./routes/tailors-routes");
app.use("/", tailorsRoutes);

const projectRoutes = require("./routes/projects-routes");
app.use("/", projectRoutes);

app.use((req, res, next) => {
  console.log("Logging a request from middleware");
  next();
});

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
