const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController'); 

// Route to issue a book
router.post('/issue', transactionController.issueBook);

router.post('/transactions', transactionController.getTransactions);
// Route to return a book
router.put('/return', transactionController.returnBook);
router.get('/return', (req, res) => {
    res.sendFile('returnBook.html', { root: 'public' }); 
  });
  router.get('/update', (req, res) => {
    res.sendFile('update.html', { root: 'public' }); 
  });
  router.get('/overdue', (req, res) => {
    res.sendFile('overdueBooks.html', { root: 'public' }); 
  });
  router.get('/borrowedBooks', (req, res) => {
    res.sendFile('issuedBook.html', { root: 'public' }); 
  });
// Route to get overdue books
router.get('/overdueBooks', transactionController.getOverdueBooks);
// Route to update transaction status
router.put('/updateStatus', transactionController.updateStatus);
router.get('/returnedBooks', transactionController.getReturnedBooks);
router.get('/issuedBooks', transactionController.getIssuedBooks);
// In the transactions route file (routes/transactions.js)
router.delete('/delete', transactionController.deleteTransaction);


module.exports = router;
