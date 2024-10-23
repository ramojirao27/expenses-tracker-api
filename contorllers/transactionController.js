const Transaction = require('../models/transactionModel');
const Category = require('../models/categoryModel');

// Add a transaction
const addTransaction = async (req, res) => {
    const { type, category, amount, date, description } = req.body;

    if (!type || !category || !amount || !date) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    let categoryObj = await Category.findOne({ name: category, type });
    if (!categoryObj) {
        categoryObj = new Category({ name: category, type });
        await categoryObj.save();
    }
    const transaction = new Transaction({
        type,
        category: categoryObj._id,
        amount,
        date,
        description,
        user: req.user._id
    });

    try {
        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all transactions for the logged-in user
const getTransactions = async (req, res) => {

    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    try {
        const transactions = await Transaction.find({ user: req.user._id })
            .skip(skip)
            .limit(parseInt(limit))
            .populate('category', 'name'); // Populate category to show name

        const count = await Transaction.countDocuments({ user: req.user._id });

        res.json({
            transactions,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page)
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Update a transaction
const updateTransaction = async (req, res) => {
    const { type, category, amount, date, description } = req.body;

    try {
        let categoryObj = await Category.findOne({ name: category, type });
        if (!categoryObj) {
            categoryObj = new Category({ name: category, type });
            await categoryObj.save();
        }

        const transaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            { type, category: categoryObj._id, amount, date, description },
            { new: true }
        );

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        res.json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a transaction
const deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndDelete(req.params.id);

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        res.json({ message: 'Transaction removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get summary of transactions
const getSummary = async (req, res) => {
    const { fromDate, toDate, category } = req.query;

    const filter = { user: req.user._id };

    if (fromDate || toDate) {
        filter.date = {};
        if (fromDate) filter.date.$gte = new Date(fromDate);
        if (toDate) filter.date.$lte = new Date(toDate);
    }

    if (category) {
        const categoryObj = await Category.findOne({ name: category });
        if (categoryObj) {
            filter.category = categoryObj._id;
        } else {
            return res.status(400).json({ message: 'Category not found' });
        }
    }

    try {
        const transactions = await Transaction.aggregate([
            { $match: filter },
            { $group: { _id: '$type', total: { $sum: '$amount' } } }
        ]);

        const income = transactions.find(t => t._id === 'income')?.total || 0;
        const expenses = transactions.find(t => t._id === 'expense')?.total || 0;

        res.json({
            income,
            expenses,
            balance: income - expenses
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction,
    getSummary
};
