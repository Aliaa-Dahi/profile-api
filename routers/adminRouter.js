const express = require("express");
const adminRouter = express.Router();

// controllers
const {
  getAdmin,
  createAdmin,
  updateAdmin,
  login,
} = require("../controllers/AdminController");

//helpers
const { validateId } = require("../middlewares/validateId.js");

//get admin
adminRouter.get("/", getAdmin);

//create admin
adminRouter.post("/", createAdmin);

//update admin
adminRouter.patch("/:id", validateId, updateAdmin);

//login
adminRouter.post("/login", login);

module.exports = { adminRouter };
