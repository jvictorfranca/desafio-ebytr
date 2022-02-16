const errorMiddleware = (err, _req, res, _next) => {
  if (err.answer) {
    return res.status(err.status).json({ message: err.answer.message });
  }
  return res.status(500).json({ message: 'Internal Server Error' });
};

module.exports = errorMiddleware;