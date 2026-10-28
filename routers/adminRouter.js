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

//middlewares
const { verifyToken } = require("../middlewares/verifyToken.js");

//get admin
adminRouter.get("/:id", getAdmin);

//create admin
adminRouter.post("/", verifyToken, createAdmin);

//update admin
adminRouter.patch("/:id", validateId, verifyToken, updateAdmin);

//login
adminRouter.post("/login", login);

module.exports = { adminRouter };
