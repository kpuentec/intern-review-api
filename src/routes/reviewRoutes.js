const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminMiddleware');
const validate = require('../middleware/validate');
const { createReviewSchema, updateReviewSchema } = require('../validators/reviewSchemas');
const Review = require('../models/Review');
const { reviewLimiter } = require('../middleware/rateLimiter');

router.post(
    '/',
    auth,
    reviewLimiter,
    validate(createReviewSchema),
    async (request, response, next) => {
        try {
            const review = await Review.create({
                user: request.user.id,
                ...request.body,
                status: 'pending'
            });

            response.status(201).json(review);
        } catch (e) {
            next(e);
        }
    }
);

router.patch(
    '/:id',
    auth,
    validate(updateReviewSchema),
    async (request, response, next) => {
        try {
            const review = await Review.findById(request.params.id);

            if (!review) {
                response.status(404);
                throw new Error("Review not found");
            }

            if (review.user.toString() !== request.user.id) {
                response.status(403);
                throw new Error("Not authorized");
            }

            delete request.body.status;
            delete request.body.user;

            const updatedReview = await Review.findByIdAndUpdate(
                request.params.id,
                request.body,
                { new: true, runValidators: true }
            );

            response.json(updatedReview);

        } catch (e) {
            next(e);
        }
    }
);

router.delete('/:id', auth, async (request, response, next) => {
    try {
        const review = await Review.findById(request.params.id);

        if (!review) {
            response.status(404);
            throw new Error("Review not found");
        }

        if (review.user.toString() !== request.user.id) {
            response.status(403);
            throw new Error("Not authorized");
        }

        await review.deleteOne();

        response.json({ message: "Review deleted successfully" });

    } catch (e) {
        next(e);
    }
});

router.get('/', async (request, response, next) => {
    try {
        const { company, role, page = 1, limit = 10 } = request.query;

        const filter = { status: 'approved' };
        if (company) filter.company = company;
        if (role) filter.role = role;

        const reviews = await Review.find(filter)
            .sort({ createdAt: -1 })
            .skip((Number(page) - 1) * Number(limit))
            .limit(Number(limit))
            .populate('user', 'name email');

        response.json(reviews);

    } catch (e) {
        next(e);
    }
});

router.patch('/:id/approve', auth, adminOnly, async (request, response, next) => {
    try {
        const review = await Review.findByIdAndUpdate(
            request.params.id,
            { status: 'approved' },
            { new: true }
        );

        if (!review) {
            response.status(404);
            throw new Error("Review not found");
        }

        response.json(review);

    } catch (e) {
        next(e);
    }
});

router.patch('/:id/reject', auth, adminOnly, async (request, response, next) => {
    try {
        const review = await Review.findByIdAndUpdate(
            request.params.id,
            { status: 'rejected' },
            { new: true }
        );

        if (!review) {
            response.status(404);
            throw new Error("Review not found");
        }

        response.json(review);

    } catch (e) {
        next(e);
    }
});

router.get('/admin/pending', auth, adminOnly, async (request, response, next) => {
    try {
        const reviews = await Review.find({ status: 'pending' })
            .sort({ createdAt: -1 })
            .populate('user', 'name email');

        response.json(reviews);

    } catch (e) {
        next(e);
    }
});
router.patch('/:id/flag', auth, async (request, response, next) => {
    try {
        const review = await Review.findById(request.params.id);

        if (!review) {
            response.status(404);
            throw new Error("Review not found");
        }

        review.flags += 1;
        await review.save();

        response.json({ message: "Review flagged" });

    } catch (e) {
        next(e);
    }
});

router.get('/admin/flagged', auth, adminOnly, async (request, response, next) => {
    try {
        const reviews = await Review.find({ flags: { $gt: 0 } })
            .sort({ flags: -1 })
            .populate('user', 'name email');

        response.json(reviews);

    } catch (e) {
        next(e);
    }
});

module.exports = router;