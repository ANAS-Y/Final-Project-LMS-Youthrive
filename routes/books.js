const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController'); 
const { ensureAuth, ensureAdmin } = require('../middleware/auth');

// Add a new book
router.post('/add', ensureAuth, ensureAdmin, bookController.addBook);
router.get('/add', (req, res) => {
    res.sendFile('add_books.html', { root: 'public' }); 
   });
// Route to get all books
router.get('/books', (req, res) => {
   res.sendFile('books.html', { root: 'public' }); 
   });

// Route to get a specific book by ID
router.get('/:id', bookController.getBookById);

// Route to get  books
router.post('/books', bookController.getAllBooks);

// Update a book
router.put('/books/:id', ensureAuth, ensureAdmin, bookController.updateBook);

// Delete a book
router.delete('/books/:id', ensureAuth, ensureAdmin, bookController.deleteBook);

// Borrow a book
router.post('/books/borrow/:id', ensureAuth, bookController.borrowBook);

module.exports = router;
