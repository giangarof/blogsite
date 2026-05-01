import User from "../models/users.js";
import { generateToken } from "../config/generateToken.js";
import jwt from "jsonwebtoken";
import { restoreToken } from "../config/restoreToken.js";
import { sendEmail } from "../config/sendEmail.js";
import crypto from "crypto";

export class UserController {
	async isIn(req, res) {
		try {
			res.status(200).json({ message: "User identified." });
		} catch (error) {
			res.status(401).json({
				message:
					"Looks like youre not admin and not even a identified user... go away!",
			});
		}
	}

	// restore password
	// route: /api/user/recover
	// method: POST
	// description: Send token
	async restorePassword(req, res) {
		const { email } = req.body;
		const user = await User.findOne({ email });
		try {
			// For security, if the user doesnt exist, send this message
			if (!user) {
				return res.status(200).json({
					message:
						"If this email is with us, we'll send a restore link to your email.",
				});
			}

			// Otherwise, if the user does exist, send the same message and generate token (which will be sent to user email)

			// generate token
			const { resetToken, hashedToken } = restoreToken();

			user.resetPasswordToken = hashedToken;
			user.resetPasswordExpire = Date.now() + 1000 * 60 * 15; // 15 min

			await user.save();

			// link
			const resetUrl = `${process.env.FRONTEND_URL}/recover/${resetToken}`;

			// console.log("Reset URL:", resetUrl);
			await sendEmail(user.email, "Password Reset", resetUrl);

			return res.status(200).json({
				link: resetUrl,
				message:
					"If this email is with us, we'll send a restore link to your email.",
			});
		} catch (error) {
			return res
				.status(500)
				.json({ message: "Server side error... try again later." });
		}
	}

	// update password
	// route: /api/user/restore-pass
	// method: PUT
	// description: validate token and update password
	async updatePassword(req, res) {
		const { token } = req.params; // get the token from the params
		const { password, confirmPassword } = req.body; // get password from the body
		try {
			// hash the token
			const hashedToken = crypto
				.createHash("sha256")
				.update(token)
				.digest("hex");

			// find the user based in the stored hashed token
			const user = await User.findOne({
				resetPasswordToken: hashedToken,
				resetPasswordExpire: { $gt: Date.now() },
			});

			// if there is not user
			if (!user) {
				return res.status(400).json({
					message: "Invalid or expired reset token",
				});
			}

			if (password !== confirmPassword) {
				return res.status(400).json({
					message: "Passwords must match",
				});
			}

			// else
			user.password = password; // make sure you hash in pre-save middleware
			user.resetPasswordToken = undefined;
			user.resetPasswordExpire = undefined;

			await user.save();

			return res.status(200).json({
				message: "Password updated successfully. Please, signin.",
			});
		} catch (error) {
			// console.error("Update password error:", error);

			return res.status(404).json({
				message: "Server error. Please try again later.",
			});
		}
	}

	// login user
	// route: /api/user/login
	// method: POST
	async loginUser(req, res) {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		// console.log(user)

		try {
			// if there are not fields
			if (!email || !password) {
				return res
					.status(400)
					.json({ message: "Please, fill out all fields." });
			}

			// if user doesnt exist
			if (!user) {
				return res.status(400).json({ message: `Invalid email or password.` });
			}

			// validate password
			const validate = await user.matchPassword(password);
			if (!validate) {
				return res.status(401).json({
					message: `Invalid email or password.`,
				});
			}

			// generate token
			const token = generateToken(res, user._id);

			return res.status(200).json({
				userProfile: user,
				_id: user._id,
				message: "Welcome Back!",
			});
		} catch (error) {
			return res
				.status(500)
				.json({ message: "Server side error... try again later." });
		}
	}

	// registration for new user
	// route: /api/user/signup
	// method: POST
	async signupUser(req, res) {
		const { name, username, email, password } = req.body;

		try {
			const userExistWithEmail = await User.findOne({ email });
			if (userExistWithEmail) {
				res.status(400);
				throw new Error("Email registered already, try a new one.");
			}

			const newUser = await User.create({
				name,
				username,
				email,
				password,
			});

			if (newUser) {
				res.status(201).json({
					_id: newUser._id,
					name: newUser.name,
					email: newUser.email,
					isAdmin: newUser.isAdmin,
				});
			} else {
				res.status(400);
				throw new Error("Invalid information, try again later.");
			}

			console.log(newUser);
		} catch (error) {
			res.send(error.message);
		}
	}

	// logout
	// route: /api/user/logout
	// method: POST
	async logoutUser(req, res) {
		res.cookie("jwt", "", {
			httpOnly: true,
			expires: new Date(0),
		});
		return res.status(200).json({ message: "Logged out successfully" });
	}

	// delete user from database
	// route: /api/user/delete/:id
	// DELETE
	async deleteUser(req, res) {
		res.send("delete user");
	}

	// profile user
	// route: /api/user/profile
	// Get
	async userProfile(req, res) {
		// const user = req.user;
		// console.log(user);
		try {
			return res.status(200).json({
				user: req.user,
			});
		} catch (error) {
			return res.status(500).json({ message: "Server error" });
		}
	}

	// profile update user
	// route: /api/user/profile
	// PUT
	async userUpdateProfile(req, res) {
		try {
			const user = req.user;
			// console.log(user);
			if (!user) {
				return res.status(404).send({ message: "User not found" });
			}

			const { name, username, email, about } = req.body;
			if (name !== undefined) user.name = name;
			if (username !== undefined) user.username = username;
			if (email !== undefined) user.email = email;
			if (about !== undefined) user.about = about;

			const update = await user.save();
			// console.log(req.body);

			return res
				.status(201)
				.json({ message: "Profile updated successfully", update });
		} catch (error) {
			// console.log(error);
			return res.status(500).json({ message: "server error" });
		}
	}
}
