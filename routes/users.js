const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { ensureAuth, ensureAdmin } = require('../middleware/auth');

// Register a new user
router.post('/register', userController.registerUser);

// Login user
router.post('/login', userController.loginUser);

// Get all users (admin only)
router.get('/', ensureAuth, ensureAdmin, userController.getUsers);

// Define other routes similarly...

module.exports = router;
