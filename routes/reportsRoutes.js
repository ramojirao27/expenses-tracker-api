const express = require('express');
const { protect } = require('../middleware/authMiddleware'); 
const Transaction = require('../models/transactionModel'); // Adjust the path according to your project structure
const router = express.Router();

// @route    GET /api/reports/monthly-spending
// @desc     Get monthly spending by category
// @access   Private
router.get('/monthly-spending', protect, async (req, res) => {
    try {
        const { year } = req.query; // Accept year as query parameter

        if (!year) {
            return res.status(400).json({ message: 'Year is required' });
        }

        const pipeline = [
            {
                $match: {
                    user: req.user._id, // Ensure that we filter by the authenticated user
                    date: {
                        $gte: new Date(`${year}-01-01`),
                        $lt: new Date(`${parseInt(year) + 1}-01-01`),
                    },
                },
            },
            {
                $group: {
                    _id: {
                        month: { $month: '$date' },
                        year: { $year: '$date' },
                        category: '$category',
                    },
                    totalAmount: { $sum: '$amount' },
                },
            },
            {
                $lookup: {
                    from: 'categories', // Name of your categories collection
                    localField: '_id.category',
                    foreignField: '_id',
                    as: 'categoryDetails',
                },
            },
            {
                $unwind: '$categoryDetails',
            },
            {
                $project: {
                    month: '$_id.month',
                    year: '$_id.year',
                    category: '$categoryDetails.name',
                    totalAmount: 1,
                },
            },
            {
                $sort: { month: 1 },
            },
        ];

        const monthlySpending = await Transaction.aggregate(pipeline);

        res.json(monthlySpending);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
