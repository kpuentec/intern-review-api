const jwt = require('jsonwebtoken');

const auth = (request, response, next) => {
    try {

        const authHeader = request.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return response.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT);

        request.user = decoded;
        next();
    } catch (e) {
        return response.status(401).json({ message: "Invalid/expired token" });
    }
};


module.exports = auth;