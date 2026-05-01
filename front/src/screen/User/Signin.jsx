//React
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI
import {
	Box,
	TextField,
	Stack,
	Button,
	Typography,
	Paper,
	InputAdornment,
	IconButton,
	Link,
} from "@mui/material";
import { Container } from "@mui/system";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

//Others
import axios from "axios";

export default function Signin() {
	const navigate = useNavigate();
	const [user, setUser] = useState({
		email: "",
		password: "",
		// showPassword:''
	});

	const [errorMsg, setErrorMsg] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const login = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("/api/user/signin", user);
			console.log(response);
			const message = response.data.message;
			const profile = {
				id: response.data._id,
				name: response.data.userProfile.name,
				isAdmin: response.data.userProfile.isAdmin,
			};
			// localStorage.setItem("profile", JSON.stringify(profile));
			sessionStorage.setItem("notification", message);
			navigate(`/`);
			location.reload();
		} catch (error) {
			console.log(error.message);
			setErrorMsg(error.response.data.message);
		}
	};

	const handleChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};
	useEffect(() => {}, []);

	return (
		<Box
			sx={{
				minHeight: "80vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				px: 2,
			}}
		>
			<Paper
				elevation={6}
				sx={{
					width: "100%",
					maxWidth: 420,
					p: 4,
					borderRadius: 3,
				}}
			>
				<Stack spacing={3} marginBottom={3}>
					{/* Header */}
					<Box sx={{ textAlign: "center" }}>
						<Typography variant="h5" fontWeight={600}>
							Welcome Back
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Sign in to continue
						</Typography>
					</Box>

					{/* Email */}
					<TextField
						fullWidth
						label="Email"
						type="email"
						variant="outlined"
						value={user.email}
						name="email"
						onChange={handleChange}
					/>

					{/* Password */}
					<TextField
						fullWidth
						label="Password"
						variant="outlined"
						type={showPassword ? "text" : "password"}
						value={user.password}
						name="password"
						onChange={handleChange}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										onClick={() => setShowPassword(!showPassword)}
										edge="end"
									>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>

					{/* Error */}
					{errorMsg && (
						<Typography
							variant="body2"
							sx={{ color: "error.main", textAlign: "center" }}
						>
							{errorMsg}
						</Typography>
					)}

					{/* Button */}
					<Button
						variant="contained"
						size="large"
						fullWidth
						onClick={login}
						sx={{ py: 1.2, borderRadius: 2 }}
					>
						Sign In
					</Button>
				</Stack>
				<Link href="/recover">Forgot password?</Link>
			</Paper>
		</Box>
	);
}
