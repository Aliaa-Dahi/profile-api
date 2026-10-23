const express = require("express");
const {
  getAllProjects,
  getOneProject,
  addProject,
  editProject,
  deleteProject,
} = require("../controllers/ProjectsController");
const { validateId } = require("../middlewares/validateProjectId");


const router = express.Router();

router.get("/", getAllProjects);

router.get("/:id", validateId, getOneProject);

router.post("/", addProject);

router.patch("/:id", validateId, editProject);

router.delete("/:id", validateId, deleteProject);

module.exports = { router };
