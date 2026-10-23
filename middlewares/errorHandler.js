const { FAILED, ERROR } = require("../utils/httpRequestText.js");

const errorHandler = (err, req, res, next) => {
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

  
  return res.status(500).json({
    state: 500,
    status: ERROR,
    message: "Internal server error",
  });
};

module.exports = { errorHandler };
