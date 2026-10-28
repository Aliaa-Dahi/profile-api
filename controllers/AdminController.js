const { log } = require("node:console");
const { Admin } = require("../models/admin.model");
const { SUCCESS, FAILED } = require("../utils/httpRequestText");
const { CustomError } = require("../utils/CustomError");

const getAdmin = async (req, res) => {
  const admin = await Admin.find().exec();
  res.status(200).json({
    state: 200,
    status: SUCCESS,
    data: admin,
  });
};

const createAdmin = async (req, res) => {
  const admin = new Admin(req.body);
  await admin.save();
  return res.status(201).json({
    state: 201,
    status: SUCCESS,
    data: admin,
  });
};

const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const newAdmin = await Admin.findByIdAndUpdate(
    id,
    { $set: req.body },
    { returnDocument: "after" }
  );
  res.status(200).json({
    state: 200,
    status: SUCCESS,
    data: newAdmin,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // findOne returns a single document or null — not an array
  const admin = await Admin.findOne({ email, password }).exec();

  if (!admin) {
    throw new CustomError("Invalid email or password", 401, FAILED);
  }

  log(`Welcome, ${admin.name}`);
  return res.status(200).json({
    state: 200,
    status: SUCCESS,
    data: { admin },
  });
};

module.exports = { getAdmin, createAdmin, updateAdmin, login };
