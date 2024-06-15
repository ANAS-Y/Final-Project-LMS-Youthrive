const Book = require('../models/Book');

// Add a new book
exports.addBook = async (req, res) => {
  try {
    const { title, author, ISBN, category, available_copies } = req.body;
    const newBook = new Book({ title, author, ISBN, category, available_copies });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
      const books = await Book.find();
      res.json({ books });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

// Get a book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a book
exports.updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedBook = await Book.findByIdAndUpdate(id, updates, { new: true });
        res.json({ message: 'Book updated successfully', book: updatedBook });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a book
exports.deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        await Book.findByIdAndDelete(id);
        res.json({ message: 'Book deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Borrow a book
exports.borrowBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        book.borrowedBy = req.user._id;
        await book.save();
        res.json({ message: 'Book borrowed successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};