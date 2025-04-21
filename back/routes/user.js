import express from 'express';
const router = express.Router();
import asyncHandler from '../config/asyncHandler.js'
import {admin, protect} from '../config/authMiddleware.js'

import { UserController } from '../controllers/user.js';
const user = new UserController();

router.get('/loggedIn', protect, asyncHandler(user.isIn))

// router.get('/login', signinUser)
router.post('/signin', asyncHandler(user.loginUser));
router.post('/signup', user.signupUser)

router.post('/logout', user.logoutUser)

// router.get('/delete/:id', deleteUser)
router.get('/profile/:id', protect, asyncHandler(user.userProfile))
router.put('/profile/:id', asyncHandler(user.userUpdateProfile))

export default router;