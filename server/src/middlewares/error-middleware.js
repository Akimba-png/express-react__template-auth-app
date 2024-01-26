const ApiError = require('./../exceptions/api-error');

const errorMiddleware = (err, _req, res, _next) => {
  if (err instanceof ApiError) {
    res.status(err.status).json({message: err.message, errors: err.errors});
    return;
  }
  res.status(500).json(err.message);
};

module.exports = errorMiddleware;
