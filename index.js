const dns = require("node:dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const express = require("express");
const { log } = require("node:console");
require("dotenv").config();
const { projectsRouter } = require("./routers/projectsRouter.js");
const { errorHandler } = require("./middlewares/errorHandler.js");
const { connect } = require("./data/db.js");
const { FAILED } = require("./utils/httpRequestText.js");

const app = express();

app.use(express.json());

app.use("/projects", projectsRouter);
app.use( (req, res) => {
  res.status(404).json({
    state: 404,
    status: FAILED,
    message: "not found",
  });
});
app.use(errorHandler);

// database connection
connect();

app.listen(3000, () => {
  log("Server is running on port 3000");
});
