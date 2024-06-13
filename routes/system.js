const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define the route for header
router.get('/navbar.html', (req, res) => {
    res.sendFile('navbar.html', { root: 'public' }); // Serve navbar.html from the public directory
  });


module.exports = router;
