const errorHandler = (err, reg, res, next) => {
  // Log to console for dev
  console.log(err.stack.red);

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Sunucu Hatası',
  });
};

module.exports = errorHandler;
