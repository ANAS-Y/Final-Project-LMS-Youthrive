const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController'); 
const { ensureAuth, ensureAdmin } = require('../middleware/auth');

// Route to issue a book
router.post('/issue', transactionController.issueBook);

router.post('/transactions',ensureAuth, ensureAdmin, transactionController.getTransactions);
// Route to return a book
router.put('/return', ensureAuth, ensureAdmin, transactionController.returnBook);
router.get('/return', (req, res) => {
    res.sendFile('returnBook.html', { root: 'public' }); 
  });
  router.get('/update', ensureAuth, ensureAdmin, (req, res) => {
    res.sendFile('update.html', { root: 'public' }); 
  });
  router.get('/overdue', ensureAuth, ensureAdmin, (req, res) => {
    res.sendFile('overdueBooks.html', { root: 'public' }); 
  });
  router.get('/borrowedBooks', ensureAuth, ensureAdmin, (req, res) => {
    res.sendFile('issuedBook.html', { root: 'public' }); 
  });
// Route to get overdue books
router.get('/overdueBooks', transactionController.getOverdueBooks);
// Route to update transaction status
router.put('/updateStatus', ensureAuth, ensureAdmin, transactionController.updateStatus);
router.get('/returnedBooks', ensureAuth, ensureAdmin, transactionController.getReturnedBooks);
router.get('/issuedBooks', ensureAuth, ensureAdmin, transactionController.getIssuedBooks);
// In the transactions route file (routes/transactions.js)
router.delete('/delete', ensureAuth, ensureAdmin, transactionController.deleteTransaction);
router.get('/header.html', (req, res) => {
  res.sendFile('header.html', { root: 'public' }); 
 });


module.exports = router;
