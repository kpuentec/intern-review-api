const rateLimit = require('express-rate-limit');

const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 200, // max 200 requests per IP per window
    message: "Too many requests, please try again later."
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10, // 10 login attempts/15 min
    message: "Too many login attempts. Try again later."
});

const reviewLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 20, // 20 reviews/10 min per IP
    message: "Too many reviews submitted. Slow down."
});

module.exports = {
    globalLimiter,
    authLimiter,
    reviewLimiter
};