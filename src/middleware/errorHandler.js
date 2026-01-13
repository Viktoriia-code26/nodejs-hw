import createHttpError from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (req.log?.error) req.log.error(err);
  else console.error(err);

  if (createHttpError.isHttpError(err)) {
    return res.status(err.status).json({ message: err.message });
  }

  const isProd = process.env.NODE_ENV === 'production';
  return res.status(500).json({
    message: isProd
      ? 'Something went wrong. Please try again later.'
      : err?.message || 'Error',
  });
};
