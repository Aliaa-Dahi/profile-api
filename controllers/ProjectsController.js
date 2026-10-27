const { log } = require("node:console");
const { Project } = require("../models/project.model.js");
const { SUCCESS, FAILED, ERROR } = require("../utils/httpRequestText.js");

const getAllProjects = async (req, res) => {
  // Default to page 1, limit 10 when no query params are provided
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 4;

  const projects = await Project.find()
    .limit(limit)
    .skip((page - 1) * limit);

  log(projects);

  res.status(200).json({
    state: 200,
    status: SUCCESS,
    data: {
      projects: projects,
    },
  });
};

const getOneProject = async (req, res) => {
  const { id } = req.params;

  const project = await Project.findById(id).exec();

  if (!project) {
    return res.status(404).json({
      state: 404,
      status: FAILED,
      data: { project: null },
    });
  }

  return res.status(200).json({
    state: 200,
    status: SUCCESS,
    data: { project },
  });
};

const addProject = async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.status(201).json({
    state: 201,
    status: SUCCESS,
    data: {
      project: project,
    },
  });
};

const editProject = async (req, res) => {
  let { id } = req.params;
  let oldProject = await Project.findById(id).exec();
  if (!oldProject) {
    return res.status(404).json({
      state: 404,
      message: "Project not found",
    });
  } else {
    const project = await Project.findByIdAndUpdate(
      id,
      { $set: { ...req.body } },
      {
        returnDocument: "after",
      }
    );
    res.status(203).json({
      state: 203,
      status: SUCCESS,
      data: {
        project: project,
      },
    });
  }
};

const deleteProject = async (req, res) => {
  const { id } = req.params;
  await Project.findByIdAndDelete(id);
  res.status(201).json({
    state: 201,
    status: SUCCESS,
    data: null,
  });
};

module.exports = {
  getAllProjects,
  getOneProject,
  addProject,
  editProject,
  deleteProject,
};
