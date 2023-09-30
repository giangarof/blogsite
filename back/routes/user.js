import express from 'express';
const router = express.Router();
import passport from 'passport';

import {
    signinUser,
    loginUser,
    logoutUser, 
    signupUser, 
    deleteUser, 
    userProfile, 
    userUpdateProfile
} from '../controllers/user.js';

router.get('/login', signinUser)
router.post('/signup', signupUser)
router.post('/login', passport.authenticate("local", {failureFlash: true, failureRedirect: '/api/user/login'}), loginUser);

// router.post('/logout', logoutUser)

// router.get('/delete/:id', deleteUser)
// router.get('/profile/:id', userProfile)
// router.get('/profile/:id', userUpdateProfile)

export default router;