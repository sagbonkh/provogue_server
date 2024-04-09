const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

const PORT = process.env.PORT || 5050;

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  console.log("Logging a request from middleware");
  next();
});

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
