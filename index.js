const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

const PORT = process.env.PORT || 5050;

// Middleware for creating a session id on server and a session cookie on client
const expressSession = require("express-session");

// Add http headers, small layer of security
const helmet = require("helmet");

// Passport library and Github Strategy
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;

// Knex instance
const knex = require("knex")(require("./knexfile.js"));

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Include express-session middleware (with additional config options required for Passport session)
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

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
