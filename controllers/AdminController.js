require("dotenv").config();
const { log } = require("node:console");
const { Admin } = require("../models/admin.model");
const { SUCCESS, FAILED } = require("../utils/httpRequestText");
const { CustomError } = require("../utils/CustomError");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const getAdmin = async (req, res) => {
  const admin = await Admin.find({ email: req.params.email })
    .select("-password")
    .exec();

  if (!admin) throw new CustomError("Admin not found", 404, FAILED);

  res.status(200).json({
    state: 200,
    status: "SUCCESS",
    data: admin,
  });
};

const createAdmin = async (req, res) => {
  const { password, ...rest } = req.body;
  if (!password || password.length < 6 || password.length > 20) {
    throw new CustomError(
      "Password must be between 6 and 20 characters",
      400,
      FAILED
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = new Admin({ ...rest, password: hashedPassword });
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
  res.status(201).json({
    state: 201,
    status: SUCCESS,
    data: newAdmin,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // Find by email only, then verify the password with bcrypt
  const admin = await Admin.findOne({ email }).exec();

  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    throw new CustomError("Invalid email or password", 401, FAILED);
  }

  let token = await jwt.sign({ email, _id: admin._id }, process.env.SECRET_KEY);
  return res.status(200).json({
    state: 200,
    status: SUCCESS,
    data: { admin, token },
  });
};

module.exports = { getAdmin, createAdmin, updateAdmin, login };
