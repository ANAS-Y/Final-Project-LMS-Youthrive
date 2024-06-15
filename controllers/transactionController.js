const Transaction = require('../models/Transaction');
const Book = require('../models/Book');
const User = require('../models/User');

// Issue a book
exports.issueBook = async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    const book = await Book.findById(bookId);
    if (!book || book.available_copies < 1) {
      return res.status(400).json({ message: 'Book not available' });
    }
    const transaction = new Transaction({
      user: userId,
      book: bookId,
      issue_date: new Date(),
      return_date: null,
      status: 'requested',
    });
    await transaction.save();
    book.available_copies -= 1;
    await book.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Return a book
exports.returnBook = async (req, res) => {
  try {
    const { transactionId } = req.body;
    const transaction = await Transaction.findById(transactionId);
    if (!transaction || transaction.status !== 'issued') {
      return res.status(400).json({ message: 'Invalid transaction' });
    }
    transaction.return_date = new Date();
    transaction.status = 'returned';
    await transaction.save();
    const book = await Book.findById(transaction.book);
    book.available_copies += 1;
    await book.save();
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get overdue books
exports.getOverdueBooks = async (req, res) => {
  try {
    const overdueTransactions = await Transaction.find({
      status: 'issued',
      issue_date: { $lt: new Date(new Date() - 14 * 24 * 60 * 60 * 1000) }, // overdue by 14 days
    }).populate('book user');
    res.status(200).json(overdueTransactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
