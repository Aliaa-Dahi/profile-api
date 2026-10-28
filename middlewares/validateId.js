const {isValidObjectId} = require("mongoose");
const { FAILED } = require("../utils/httpRequestText.js");

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({
      state: 400,
      status: FAILED,
      message: "Invalid ID",
    });
  }
  next();
};

module.exports = { validateId };
