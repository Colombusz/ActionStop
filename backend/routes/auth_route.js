import express from 'express';
const router = express.Router();

import { registerUser } from '../controllers/auth_controller.js';

// Under Construction
// const { isAuthenticaedUser } = require('../middleware/authuser');

// Routes
router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

export default router;