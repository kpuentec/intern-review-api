const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    company: { type: String, required: true },
    role: { type: String, required: true },
    location: { type: String },
    salary: { type: Number },
    interviewDifficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
    rating: { type: Number, min: 1, max: 5, required: true },
    text: { 
    type: String, 
    required: true,
    minlength: 20,
    maxlength: 2000
    },
    status: { type: String, enum: ['pending','approved','rejected'], default: 'pending' },
    flags: {
    type: Number,
    default: 0
    },
}, { timestamps: true });

reviewSchema.index({ company: 1 });
reviewSchema.index({ status: 1 });
reviewSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Review', reviewSchema);