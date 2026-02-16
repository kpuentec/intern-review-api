const jwt = require('jsonwebtoken');

const auth = (request, response, next) => {
    try {
        console.log("HEADERS RECEIVED:", request.headers);

        const authHeader = request.headers.authorization;
        console.log("AUTH HEADER:", authHeader);

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return response.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT);

        request.user = decoded;
        next();
    } catch (e) {
        console.log("JWT ERROR:", e.message);
        return response.status(401).json({ message: "Invalid/expired token" });
    }
};


module.exports = auth;