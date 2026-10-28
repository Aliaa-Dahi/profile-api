const express = require("express");
const {
  getAllProjects,
  getOneProject,
  addProject,
  editProject,
  deleteProject,
} = require("../controllers/ProjectsController");

//middlewares
const { validateId } = require("../middlewares/validateId");
const { verifyToken } = require("../middlewares/verifyToken");

const projectsRouter = express.Router();

projectsRouter.get("/", getAllProjects);

projectsRouter.get("/:id", validateId, getOneProject);

projectsRouter.post("/", verifyToken, addProject);

projectsRouter.patch("/:id", validateId, verifyToken, editProject);

projectsRouter.delete("/:id", validateId, verifyToken, deleteProject);

module.exports = { projectsRouter };