const validate = (schema) => (request, response, next) => {
    try {
        request.body = schema.parse(request.body);
        next();
    } catch (error) {
        response.status(400);
        next(error);
    }
};

module.exports = validate;