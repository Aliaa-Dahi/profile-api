const { FAILED, ERROR } = require("../utils/httpRequestText.js");
const { CustomError } = require("../utils/CustomError.js");

const errorHandler = (err, req, res, next) => {
  // Our own custom application errors — use the status code we set
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      state: err.statusCode,
      status: err.status,
      message: err.message,
    });
  }

  // Mongoose validation error — bad field values from the client
  if (err.name === "ValidationError" && err.errors) {
    const errors = Object.values(err.errors).map((error) => ({
      field: error.path,
      message: error.message,
    }));
    return res.status(400).json({
      state: 400,
      status: FAILED,
      error: errors,
    });
  }

  // Unexpected server error — log it, don't expose internals to the client
  return res.status(500).json({
    state: 500,
    status: ERROR,
    message: "Internal server error",
  });
};

module.exports = { errorHandler };
