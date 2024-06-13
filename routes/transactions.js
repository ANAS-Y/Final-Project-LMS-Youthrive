const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController'); // Ensure this path is correct

// Route to issue a book
router.post('/issue', transactionController.issueBook);

// Route to return a book
router.post('/return', transactionController.returnBook);

// Route to get overdue books
router.get('/overdue', transactionController.getOverdueBooks);

module.exports = router;
