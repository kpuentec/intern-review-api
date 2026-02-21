const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Review = require('../models/Review');

router.post('/', auth, async (request, response) => {
    try {
        const {
            company,
            role,
            location,
            salary,
            interviewDifficulty,
            rating,
            text
        } = request.body;

        const review = await Review.create({
            user: request.user.id,
            company,
            role,
            location,
            salary,
            interviewDifficulty,
            rating,
            text,
            status: 'pending'
        });

        response.status(201).json(review);
    } catch (e) {
        response.status(500).json({ message: 'Server error' });
    }
});

router.patch('/:id', auth, async (request, response) => {
    try {
        const review = await Review.findById(request.params.id);

        if (!review) {
            return response.status(404).json({ message: 'Review not found' });
        }

        if (review.user.toString() !== request.user.id) {
            return response.status(403).json({ message: 'Not authorized' });
        }

        delete request.body.status;
        delete request.body.user;

        const updatedReview = await Review.findByIdAndUpdate(
            request.params.id,
            request.body,
            { new: true }
        );

        response.json(updatedReview);
    } catch (e) {
        console.error(e);
        response.status(500).json({ message: 'Server error' });
    }
});

router.delete('/:id', auth, async (request, response) => {
    try {
        const review = await Review.findById(request.params.id);

        if (!review) {
            return response.status(404).json({ message: 'Review not found' });
        }

        if (review.user.toString() !== request.user.id) {
            return response.status(403).json({ message: 'Not authorized' });
        }

        await review.deleteOne();

        response.json({ message: 'Review deleted successfully' });
    } catch (e) {
        console.error(e);
        response.status(500).json({ message: 'Server error' });
    }
});

router.get('/', async (request, response) => {
    try {
        const { company, role, page = 1, limit = 10 } = request.query;

        const filter = { status: 'approved' };

        if (company) filter.company = company;
        if (role) filter.role = role;

        const reviews = await Review.find(filter)
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .populate('user', 'name email');

        response.json(reviews);
    } catch (e) {
        console.error(e);
        response.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;