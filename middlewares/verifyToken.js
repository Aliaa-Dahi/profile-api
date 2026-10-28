require("dotenv").config();
const jwt = require("jsonwebtoken");
const { CustomError } = require("../utils/CustomError.js");
const { FAILED } = require("../utils/httpRequestText.js");

const verifyToken = (req, res, next) => {
  const { token } = req.headers;
  if (!token) throw new CustomError("UnAuthorized", 401, FAILED);
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decodedToken; // attach payload so controllers can access it
    next();
  } catch (err) {
    throw new CustomError("Invalid token", 401, FAILED);
  }
};

module.exports = { verifyToken };
