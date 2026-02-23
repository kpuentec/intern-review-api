const adminOnly = (request, response, next) => {
    if (!request.user || request.user.role !== 'admin') {
        return response.status(403).json({ message: 'Admin access required' });
    }
    next();
};

module.exports = adminOnly;