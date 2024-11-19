import express from 'express';
const router = express.Router();

const { 
    registerUser,

} = require('../controllers/auth_controller');

// Under Construction
// const { isAuthenticaedUser } = require('../middleware/authuser');

// Routes
router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

export default router;