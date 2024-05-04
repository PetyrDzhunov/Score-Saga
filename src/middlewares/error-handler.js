const errorHandler = (err, req, res, next) => {
  err.message = err.message || 'Something went wrong';
  err.status = err.status || 500;

  console.error(err);

  res.status(err.status).json({
    error: {
      message: err.message,
      status: err.status,
    },
  });
};

module.exports = errorHandler;
