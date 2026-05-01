import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/users.js";

// Protect routes users from middleware
export const protect = asyncHandler(async (req, res, next) => {
	try {
		let token;
		// Read the jwt from the cookie
		if (req.cookies?.jwt) {
			token = req.cookies?.jwt;
		}

		if (!token) {
			return res.status(401).json({ message: "Not authorized" });
		}
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		const user = await User.findById(decoded.userId).select("-password");
		console.log("USER FROM DB:", user);
		if (!user) {
			return res.status(404).json({ message: "Invalid user..." });
		}
		req.user = user;

		next();
	} catch (error) {
		return res.status(401).json({ message: error });
	}
});

// Admin middleware
export const admin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		res.status(401);
		throw new Error("No authorization as admin");
	}
};
