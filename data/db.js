require("dotenv").config();
const mongoose = require("mongoose");

const connect = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI, { dbName: "profileDB" })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
};

module.exports = { connect };
