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
            // req.user = decoded;
            // console.log(decoded)
            res.status(200)
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
