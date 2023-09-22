import express from 'express';
const router = express.Router();

import {
    loginUser, logoutUser, signupUser, deleteUser, userProfile, userUpdateProfile
} from '../controllers/user.js';

router.get('/login', loginUser)
router.post('/signup', signupUser)
router.get('/logout', logoutUser)

router.get('/delete/:id', deleteUser)
router.get('/profile/:id', userProfile)
router.get('/profile/:id', userUpdateProfile)

export default router;