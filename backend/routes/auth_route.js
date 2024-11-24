import express from 'express';
import { signup, verifyEmail, login, googlelogin, logout, forgotPassword, resetPassword, getUsers, getUserById, getCurrentUser, updateProfile, storeFCM } from '../controllers/auth_controller.js';
import { isAuthenticatedUser, authorizeAdmin } from '../middleware/authuser.js';
import upload from '../utils/multer.js';

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
router.put('/update', upload.single("upload_profile"), updateProfile);

router.get('/users', isAuthenticatedUser ,getUsers, authorizeAdmin);
router.get('/users/:id', isAuthenticatedUser, getUserById, authorizeAdmin);
router.put('/user/fcmToken', storeFCM)

// To DO
// getuserprofile, updateprofile, updatepassword, forgotpassword, resetpassword
// Admin
// updateuser

export default router;