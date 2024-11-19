const express = require('express');
const router = express.Router();

const { 
    registerUser,

} = require('../controllers/auth_controller');

// Under Construction
// const { isAuthenticaedUser } = require('../middleware/authuser');

// Routes
router.post('/signup', registerUser);

export default router;