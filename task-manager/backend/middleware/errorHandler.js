const errorHandler = (err, req, res, next) => {
  console.error(err);

  const status = err.status || 500;

  res.status(status).json({
    sucess: false,
    message: err.message || 'Internal Server Error',
  });
};

module.exports = errorHandler;
