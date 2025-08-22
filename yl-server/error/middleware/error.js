

// error/middleware/error.js
export default function errorHandler(err, req, res, next) {
  // Handle if err is missing
  if (!err) {
    return res.status(500).json({ status: 'error', message: 'Unknown error' });
  }

  

  console.error(err.stack || err); // safe log
  res.status(err.statusCode || 500).json({
    status: err.status || 'error',
    message: err.message || 'Internal Server Error',
  });
}
