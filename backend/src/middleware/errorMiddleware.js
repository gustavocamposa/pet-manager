function errorMiddleware(error, req, res, next) {
  const status = error.status || 500;

  return res.status(status).json({
    error: error.message,
  });
}

export { errorMiddleware };
