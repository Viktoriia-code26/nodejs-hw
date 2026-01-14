import createHttpError from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;

  if (req.log) {
    if (status >= 500) req.log.error(err);
    else req.log.warn({ err }, err.message);
  } else {
    console.error(err);
  }

  if (createHttpError.isHttpError(err)) {
    return res.status(status).json({ message: err.message || err.name });
  }

  const isProd = process.env.NODE_ENV === 'production';
  return res.status(500).json({
    message: isProd
      ? 'Something went wrong. Please try again later.'
      : err.message,
  });
};
