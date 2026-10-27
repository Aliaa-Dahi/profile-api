const express = require("express");
const {
  getAllProjects,
  getOneProject,
  addProject,
  editProject,
  deleteProject,
} = require("../controllers/ProjectsController");
const { validateId } = require("../middlewares/validateProjectId");

const projectsRouter = express.Router();

projectsRouter.get("/", getAllProjects);

projectsRouter.get("/:id", validateId, getOneProject);

projectsRouter.post("/", addProject);

projectsRouter.patch("/:id", validateId, editProject);

projectsRouter.delete("/:id", validateId, deleteProject);

module.exports = { projectsRouter };
