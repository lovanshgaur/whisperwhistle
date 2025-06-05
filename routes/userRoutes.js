// ./routes/userRoutes

const express = require('express');
const router = express.Router();

const {
    register,
    login,
    myInfo,
} = require('../controllers/userControllers');

const auth = require('../middlewares/auth')

// Public Routes
router.post('/register',register);
router.post('/login', login);

//Private Routes
router.get('/me', auth, myInfo);

module.exports = router;