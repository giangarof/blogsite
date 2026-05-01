import { useState } from "react";
import {
	Box,
	Paper,
	Typography,
	TextField,
	Button,
	Stack,
	Alert,
} from "@mui/material";

//Others
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function RestorePasswordUpdate() {
	const navigate = useNavigate();
	const { token } = useParams();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [loading, setLoading] = useState(false);
	const [successMsg, setSuccessMsg] = useState("");
	const [errorMsg, setErrorMsg] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSuccessMsg("");
		setErrorMsg("");
		
		if (!password) {
			setErrorMsg("Please, type your new password");
			return;
		}
		if (password !== confirmPassword) {
			setErrorMsg("Passwords must match.");
			return;
		}
		
		try {
			setLoading(true);
			const response = await axios.put(`/api/user/recover/${token}`, {
				password, confirmPassword
			})
			
			sessionStorage.setItem("notification", response.data.message);
			navigate(`/signin`);
			location.reload();
		} catch (err) {
			console.log(err);
			setErrorMsg(err.message);
		} finally {
			setLoading(false);
		}
	};

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
				<Stack spacing={3}>
					{/* Header */}
					<Box textAlign="center">
						<Typography variant="h5" fontWeight={600}>
							Update Password
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Enter your email to receive a reset link
						</Typography>
					</Box>

					{/* New Password */}
					<TextField
						fullWidth
						label="Password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					{/* Confirm Password */}
					<TextField
						fullWidth
						label="Confirm Password"
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>

					{/* Success */}
					{successMsg && <Alert severity="success">{successMsg}</Alert>}

					{/* Error */}
					{errorMsg && <Alert severity="error">{errorMsg}</Alert>}

					{/* Button */}
					<Button
						variant="contained"
						fullWidth
						size="large"
						onClick={handleSubmit}
						disabled={loading}
						sx={{ py: 1.2, borderRadius: 2 }}
					>
						{loading ? "Update in process..." : "Update"}
					</Button>
				</Stack>
			</Paper>
		</Box>
	);
}
