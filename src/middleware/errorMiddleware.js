const errorHandler = (err, request, response, next) => {
    console.error(err);

    const statusCode = response.statusCode && response.statusCode !== 200
        ? response.statusCode
        : 500;

    response.status(statusCode).json({
        message: err.message || 'Server Error',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
};

module.exports = errorHandler;