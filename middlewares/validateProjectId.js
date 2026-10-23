const { isValidateObjectId } = require("mongoose");
import { FAILED } from "../utils/httpRequestText.js";

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidateObjectId(id)) {
    res.status(400).json({
      state: 400,
      statue: FAILED,
      message: "Invalid ID",
    });
  }
  next();
};

module.exports = { validateId };
