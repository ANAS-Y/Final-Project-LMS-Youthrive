const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController'); // Ensure this path is correct

// Route to add a new book
router.post('/add', bookController.addBook);

// Route to get all books
router.get('/', bookController.getBooks);

// Route to get a specific book by ID
router.get('/:id', bookController.getBookById);

// Route to update a book by ID
router.put('/:id', bookController.updateBook);

// Route to delete a book by ID
router.delete('/:id', bookController.deleteBook);

module.exports = router;
