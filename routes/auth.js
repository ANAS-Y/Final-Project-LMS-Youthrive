const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { ensureAuth, ensureAdmin } = require('../middleware/auth');

// Define the route for login
router.get('/login', (req, res) => {
  res.sendFile('login.html', { root: 'public' }); // Serve login.html from the public directory
});
// Define the route for Dashboard
router.get('/dashboard', ensureAuth, ensureAdmin, (req, res) => {
  res.sendFile('home.html', { root: 'public' }); // Serve dashboard.html from the public directory
});

// Define the route for register
router.get('/register', (req, res) => {
 res.sendFile('register.html', { root: 'public' }); // Serve register.html from the public directory
});
router.post('/login', authController.loginUser);
router.post('/register', authController.registerUser);
//router.post('/users', authController.getUsers);

router.post('/users', ensureAuth, ensureAdmin, authController.getUsers);
// Update a user (admin only)
router.put('/users/:id', ensureAuth, ensureAdmin, authController.updateUser);
// Delete a user (admin only)
router.delete('/users/:id', ensureAuth, ensureAdmin, authController.deleteUser);


router.get('/logout', authController.logoutUser);

// Serve all users HTML page (admin only)
router.get('/users',  ensureAuth, ensureAdmin, (req, res) => {
  res.sendFile('users.html', { root: 'public' }); 
});
module.exports = router;
