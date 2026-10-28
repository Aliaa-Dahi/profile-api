//dns problem
const dns = require("node:dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

//packages
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { log } = require("node:console");

//routes
const { projectsRouter } = require("./routers/projectsRouter.js");
const { adminRouter } = require("./routers/adminRouter.js");

//middlewares
const { errorHandler } = require("./middlewares/errorHandler.js");

//helpers
const { connect } = require("./data/db.js");
const { FAILED } = require("./utils/httpRequestText.js");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/projects", projectsRouter);
app.use("/admin", adminRouter);

// Non found route handler
app.use((req, res) => {
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
