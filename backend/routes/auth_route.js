import express from 'express';
import { signup, verifyEmail, login, googlelogin, logout, forgotPassword, resetPassword, getUsers, getUserById, getCurrentUser } from '../controllers/auth_controller.js';
import { isAuthenticatedUser, authorizeAdmin } from '../middleware/authuser.js';

const router = express.Router();

// Routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/google-login', googlelogin);
router.post('/logout', logout);
router.post('/verifyemail', verifyEmail);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resetToken', resetPassword);

router.get('/current-user', isAuthenticatedUser, getCurrentUser);

router.get('/users', isAuthenticatedUser ,getUsers, authorizeAdmin);
router.get('/user/:id', isAuthenticatedUser, getUserById, authorizeAdmin);



// To DO
// getuserprofile, updateprofile, updatepassword, forgotpassword, resetpassword
// Admin
// updateuser

export default router;