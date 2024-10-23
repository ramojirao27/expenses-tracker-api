const express = require('express');
const {
    addTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction,
    getSummary
} = require('../contorllers/transactionController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// @route    POST /api/transactions
router.post('/', protect, addTransaction);

// @route    GET /api/transactions
router.get('/', protect, getTransactions);

// @route    PUT /api/transactions/:id
router.put('/:id', protect, updateTransaction);

// @route    DELETE /api/transactions/:id
router.delete('/:id', protect, deleteTransaction);

// @route    GET /api/summary
router.get('/summary', protect, getSummary);

module.exports = router;
