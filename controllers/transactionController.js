const Transaction = require('../models/Transaction');
const Book = require('../models/Book');
const User = require('../models/User');

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ status: 'requested' })
      .populate({
        path: 'book',
        select: 'title author ISBN',
      })
      .populate({
        path: 'user',
        select: 'username',
      });
      res.status(201).json({transactions});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getUTransactions = async (req, res) => {
  try {
    const { user } = req.body;
    const transactions = await Transaction.find({ status: 'requested', user:user })
      .populate({
        path: 'book',
        select: 'title author ISBN',
      })
      .populate({
        path: 'user',
        select: 'username',
      });
      res.status(201).json({transactions});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getReturnedBooks = async (req, res) => {
  try {
    const transactions = await Transaction.find({ status: 'returned' })
      .populate({
        path: 'book',
        select: 'title author ISBN',
      })
      .populate({
        path: 'user',
        select: 'username',
      });
      res.status(201).json({transactions});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getIssuedBooks = async (req, res) => {
  try {
    const transactions = await Transaction.find({ status: 'issued' })
      .populate({
        path: 'book',
        select: 'title author ISBN',
      })
      .populate({
        path: 'user',
        select: 'username',
      });
      res.status(201).json({transactions});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getUIssuedBooks = async (req, res) => {
  try {
    const {user} = req.body;
    const transactions = await Transaction.find({ status: 'issued'})
      .populate({
        path: 'book',
        select: 'title author ISBN',
      })
      .populate({
        path: 'user',
        select: 'username',
      });
      res.status(201).json({transactions});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Issue a book
// Issue a book
exports.issueBook = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    // Find the book by ID
    const book = await Book.findById(bookId);
    if (!book || book.available_copies < 1) {
      return res.status(400).json({ message: 'Book not available' });
    }

    // Check if the user has already issued the same copy of the book and has not returned it
    const existingTransaction = await Transaction.findOne({
      user: userId,
      book: bookId,
      status: 'requested'
    });

    const existingTransaction2 = await Transaction.findOne({
      user: userId,
      book: bookId,
      status: 'issued'
    });
    if (existingTransaction || existingTransaction2) {
      return res.status(400).json({ message: 'You have already requested or issued this book and not returned it yet.' });
    }

    // Find the user by ID
    const user = await User.findById(userId);

    // Create a new transaction for issuing the book
    const transaction = new Transaction({
      user: user._id,
      book: book._id,
      issue_date: new Date(),
      return_date:new Date().getTime() + 14 * 24 * 60 * 60 * 1000, 
      status: 'requested'
    });

    // Save the transaction
    await transaction.save();

    // Decrease the available copies of the book
    //book.available_copies -= 1;
    await book.save();

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Return a book
exports.returnBook = async (req, res) => {
  try {
    const { transactionId,status } = req.body;
    const transaction = await Transaction.findById(transactionId);
    if (!transaction || transaction.status !== 'issued') {
      return res.status(400).json({ message: 'Invalid transaction' });
    }
    transaction.return_date = new Date();
    transaction.status = status;
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
    res.status(200).json({overdueTransactions});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getUOverdueBooks = async (req, res) => {
  try {
    //const {user} = req.body;
    const overdueTransactions = await Transaction.find({
      //user:user,
      status: 'issued',
      issue_date: { $lt: new Date(new Date() - 14 * 24 * 60 * 60 * 1000) }, // overdue by 14 days
    }).populate('book user');
    res.status(200).json({overdueTransactions});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { transactionId, status} = req.body;
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return res.status(400).json({ message: 'Invalid Transaction' });
    }
    issue_date = new Date().getTime() - 14 * 24 * 60 * 60 * 1000;
    due_date = new Date();//(issue_date.getTime()) + 14 * 24 * 60 * 60 * 1000);
    transaction.issue_date =  issue_date;
    transaction.return_date = due_date;
    transaction.status = status;
    await transaction.save();
    const book = await Book.findById(transaction.book);
    book.available_copies -= 1;
    await book.save();
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// In transactionController.js
exports.deleteTransaction = async (req, res) => {
  const { transactionId } = req.body;
  try {
    await Transaction.findByIdAndDelete(transactionId);
    res.status(200).json({ message: 'Transaction deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting transaction' });
  }
};



exports.getStats = async (req, res) => {
  try {
    const borrowedBooks = await Transaction.countDocuments({ status: 'issued' });
    const returnedBooks = await Transaction.countDocuments({ status: 'returned' });
    const availableBooks = await Book.countDocuments({ available_copies: { $gt: 0 } });
    const overdueBooks = await Transaction.countDocuments({
      status: 'issued',
      issue_date: { $lt: new Date(new Date() - 14 * 24 * 60 * 60 * 1000) }, // overdue by 14 days
    });
    res.json({
      borrowedBooks,
      returnedBooks,
      overdueBooks,
      availableBooks
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



