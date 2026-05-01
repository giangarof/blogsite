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

export default function RestorePassword() {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [successMsg, setSuccessMsg] = useState("");
	const [errorMsg, setErrorMsg] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSuccessMsg("");
		setErrorMsg("");

		if (!email) {
			setErrorMsg("Please enter your email.");
			return;
		}

		try {
			setLoading(true);

			const response = await axios.post("/api/user/recover", { email });
			const message = response.data.message;
			console.log(response);

			setSuccessMsg(message);
		} catch (err) {
			console.log(err);
			setErrorMsg("Something went wrong. Please try again.");
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
							Restore Password
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Enter your email to receive a reset link
						</Typography>
					</Box>

					{/* Email */}
					<TextField
						fullWidth
						label="Email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
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
						{loading ? "Sending..." : "Send Reset Link"}
					</Button>
				</Stack>
			</Paper>
		</Box>
	);
}
