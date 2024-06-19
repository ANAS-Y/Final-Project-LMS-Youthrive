const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController'); // Ensure this path is correct

// Route to add a new book
router.post('/add', bookController.addBook);
router.get('/add', (req, res) => {
    res.sendFile('add_books.html', { root: 'public' }); 
   });
// Route to get all books
router.get('/books', (req, res) => {
   res.sendFile('books.html', { root: 'public' }); 
   });

   router.get('/header.html', (req, res) => {
      res.sendFile('header.html', { root: 'public' }); 
     });

// Route to get a specific book by ID
router.get('/:id', bookController.getBookById);

// Route to get  books
router.post('/books', bookController.getAllBooks);

// Route to update a book by ID
router.put('/:id', bookController.updateBook);

// Route to delete a book by ID
router.delete('/:id', bookController.deleteBook);

module.exports = router;
