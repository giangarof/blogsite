import express from "express";
const router = express.Router();
import asyncHandler from "../config/asyncHandler.js";
import { admin, protect } from "../config/authMiddleware.js";

import { UserController } from "../controllers/user.js";
const user = new UserController();

router.get("/loggedIn", protect, asyncHandler(user.isIn));

// router.get('/login', signinUser)
router.post("/signin", asyncHandler(user.loginUser));
router.post("/signup", user.signupUser);
router.post("/logout", user.logoutUser);

// password reset
router.post("/recover", user.restorePassword);
router.put("/recover/:token", user.updatePassword);

// router.get('/delete/:id', deleteUser)
router.get("/profile", protect, asyncHandler(user.userProfile));
router.put("/profile", protect, asyncHandler(user.userUpdateProfile));

export default router;
