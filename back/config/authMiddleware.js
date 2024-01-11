import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/users.js";


// Protect routes users from middleware
export const protect = asyncHandler(async(req,res,next) => {
    let token;
    // Read the jwt from the cookie
    token = req.cookies.jwt;
    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId).select('-password')
            next()
        } catch (error) {
            console.log(error)
            res.status(401);
            throw new Error('No authorization, token failed')
        }

    } else {
        res.status(401);
        throw new Error('No authorization allowed')
    }
})

// Admin middleware
export const admin = (req,res,next) => {
    if(req.user && req.user.isAdmin){
        next()
    } else{
        throw new Error('No authorization as admin')
    }
}

export const auth = (req,res,next) => {
    const token = req.cookies.jwt;
    if (token) {
        try {
            // Decode the JWT
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Replace 'your-secret-key' with your actual secret key

            // Access information from the decoded token
            req.user = decodedToken; // Assuming the decoded token contains user information
            console.log(decodedToken)
            // Continue to the next middleware or route handler
            next();
        } catch (error) {
            // Handle token verification error
            console.error('Token verification failed:', error);
            res.status(401).json({ message: 'Unauthorized' });
        }
    } else {
        // No token provided
        res.status(401).json({ message: 'Unauthorized' });
    }
    // console.log(token)
    // next()
}