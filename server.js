const dns = require("node:dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const express = require("express");
const { log } = require("node:console");
require("dotenv").config();
const mongoose = require("mongoose");
const { router } = require("./routers/projectsRouter.js");
// const {connect} = require('./db.js');

const app = express();

app.use(express.json());

app.use("", router);

// database connection
const url = process.env.MONGODB_URI;
main().catch((err) => console.log(err));

async function main() {
  await mongoose
    .connect(process.env.MONGODB_URI, {
      dbName: "profileDB",
    })
    .then(() => log("Connected to MongoDB"))
    .catch((err) => log(err));
}

main();

app.listen(3000, () => {
  log("Server is running on port 3000");
});
