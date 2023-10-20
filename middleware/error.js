const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, reg, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // Log to console for dev
  console.log(err.stack.red);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `${err.value}'li kaynak bulunamadı.`;
    error = new ErrorRespons(message, 404);
  }

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Sunucu Hatası',
  });
};

module.exports = errorHandler;
