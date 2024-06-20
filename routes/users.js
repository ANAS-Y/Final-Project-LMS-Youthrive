const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { ensureAuth, ensureAdmin } = require('../middleware/auth');

// Register a new user
router.post('/register', ensureAuth, ensureAdmin,userController.registerUser);

// Login user
router.post('/login', userController.loginUser);

// Get all users (admin only)
//router.get('/users', ensureAuth, ensureAdmin, userController.getUsers);
// Serve login HTML page
router.get('/login', (req, res) => {
    res.sendFile('login.html', { root: 'public' }); // Serve register.html from the public directory

});

// Serve all users HTML page (admin only)
router.get('/users', (req, res) => {
    res.sendFile('user.html', { root: 'public' }); // Serve register.html from the public directory

});
router.get('/header.html', (req, res) => {
    res.sendFile('header.html', { root: 'public' }); 
   });

// Define other routes similarly...

module.exports = router;
