const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Review = require('../models/Review');
const adminOnly = require('../middleware/adminMiddleware');

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
            { new: true, runValidators: true }
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
        const pageNumber = Number(page);
        const limitNumber = Number(limit);

        const filter = { status: 'approved' };

        if (company) filter.company = company;
        if (role) filter.role = role;

        const reviews = await Review.find(filter)
            .sort({ createdAt: -1 })
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber)
            .populate('user', 'name email');

        response.json(reviews);
    } catch (e) {
        console.error(e);
        response.status(500).json({ message: 'Server error' });
    }
});

router.patch('/:id/approve', auth, adminOnly, async (request, response) => {
    try {
        const review = await Review.findByIdAndUpdate(
            request.params.id,
            { status: 'approved' },
            { new: true }
        );

        if (!review) {
            return response.status(404).json({ message: 'Review not found' });
        }

        response.json(review);
    } catch (e) {
        response.status(500).json({ message: 'Server error' });
    }
});

router.patch('/:id/reject', auth, adminOnly, async (request, response) => {
    try {
        const review = await Review.findByIdAndUpdate(
            request.params.id,
            { status: 'rejected' },
            { new: true }
        );

        if (!review) {
            return response.status(404).json({ message: 'Review not found' });
        }

        response.json(review);
    } catch (e) {
        response.status(500).json({ message: 'Server error' });
    }
});

router.get('/admin/pending', auth, adminOnly, async (request, response) => {
    try {
        const reviews = await Review.find({ status: 'pending' })
            .sort({ createdAt: -1 })
            .populate('user', 'name email');

        response.json(reviews);
    } catch (e) {
        response.status(500).json({ message: 'Server error' });
    }
});

router.patch('/:id/flag', auth, async (request, response) => {
    try {
        const review = await Review.findById(request.params.id);

        if (!review) {
            return response.status(404).json({ message: 'Review not found' });
        }

        review.flags += 1;
        await review.save();

        response.json({ message: 'Review flagged' });
    } catch (e) {
        response.status(500).json({ message: 'Server error' });
    }
});

router.get('/admin/flagged', auth, adminOnly, async (request, response) => {
    try {
        const reviews = await Review.find({ flags: { $gt: 0 } })
            .sort({ flags: -1 })
            .populate('user', 'name email');

        response.json(reviews);
    } catch (e) {
        response.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;