const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Middleware to authenticate the user
const ensureAuth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
       return res.status(401).send('<html><head><link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet"></head><body><div class="container mt-4"> <div class="alert alert-danger fade show" role="alert"><h3>Unautorize access, Please Login to access the page </h3> <button type="button" class="btn btn-success" href="../auth/login"><a href="../auth/login" class="btn btn-success"><span aria-hidden="true"> </span>Click here to Login >>></a></button></div></div><script src="https://code.jquery.com/jquery-3.5.1.min.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script></body></html>')
       
    }

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).send('<html><head><link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet"></head><body><div class="container mt-4"> <div class="alert alert-danger fade show" role="alert"><h3>Unautorize access, Please Login to access the page </h3> <button type="button" class="btn btn-success" href="../auth/login"><a href="../auth/login" class="btn btn-success"><span aria-hidden="true"> </span>Click here to Login >>></a></button></div></div><script src="https://code.jquery.com/jquery-3.5.1.min.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script></body></html>')

    }
};

// Middleware to ensure the user is an admin
const ensureAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(401).send('<html><head><link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet"></head><body><div class="container mt-4"> <div class="alert alert-danger fade show" role="alert"><h3>Unautorize access, only admin can access this page! </h3> <button type="button" class="btn btn-success" href="../auth/login"><a href="../auth/login" class="btn btn-success"><span aria-hidden="true"> </span>Click here to Login >>></a></button></div></div><script src="https://code.jquery.com/jquery-3.5.1.min.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script></body></html>')

    }
};

// Register a new user
router.post('/register',ensureAuth,ensureAdmin, authController.registerUser);

// Login user
router.post('/login', authController.loginUser);

// Logout user
router.post('/logout', ensureAuth, authController.logoutUser);

// middleware/auth.js
const jwt = require('jsonwebtoken');


module.exports = { ensureAuth, ensureAdmin };