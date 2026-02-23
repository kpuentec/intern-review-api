const { z } = require('zod');

const createReviewSchema = z.object({
    company: z.string().min(1, "Company is required"),
    role: z.string().min(1, "Role is required"),
    location: z.string().optional(),
    salary: z.number().positive().optional(),
    interviewDifficulty: z.enum(['Easy', 'Medium', 'Hard']).optional(),
    rating: z.number().min(1).max(5),
    text: z.string().min(20).max(2000)
});

const updateReviewSchema = createReviewSchema.partial();

module.exports = {
    createReviewSchema,
    updateReviewSchema
};