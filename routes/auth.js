const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define the route for login
router.get('/login', (req, res) => {
  res.sendFile('login.html', { root: 'public' }); // Serve login.html from the public directory
});
// Define the route for Dashboard
router.get('/dashboard', (req, res) => {
  res.sendFile('dashboard.html', { root: 'public' }); // Serve dashboard.html from the public directory
});

// Define the route for register
router.get('/register', (req, res) => {
  res.sendFile('register.html', { root: 'public' }); // Serve register.html from the public directory
});
router.post('/login', authController.loginUser);
router.post('/register', authController.registerUser);

module.exports = router;
