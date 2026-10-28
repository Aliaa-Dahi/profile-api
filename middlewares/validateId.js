const { isValidObjectId } = require("mongoose");
const { FAILED } = require("../utils/httpRequestText.js");
const { CustomError } = require("../utils/CustomError.js");

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) throw new CustomError("Invalid ID", 400, FAILED);
  next();
};

module.exports = { validateId };
