import { Typography, Alert, Slide, Box } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

import React, { useEffect, useState } from "react";

export default function Message() {
	const [message, setMessage] = useState("");

	const readMessage = () => {
		const msg = sessionStorage.getItem("notification");

		if (msg) {
			setMessage(msg);

			setTimeout(() => {
				sessionStorage.removeItem("notification");
				setMessage(null);
			}, 5000);
		}
	};

	useEffect(() => {
		readMessage();
	}, []);

	if (!message) return null;

	return (
		<>
			<Slide direction="down" in={open} mountOnEnter unmountOnExit>
				<Box
					sx={{
						position: "fixed",
						top: 70,
						left: 0,
						right: 0,
						display: "flex",
						justifyContent: "center",
						zIndex: 2000,
						px: 2,
					}}
				>
					<Alert
						icon={<CheckIcon fontSize="inherit" />}
						severity="success"
						sx={{
							borderRadius: 3,
							boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
							fontSize: 14,
							alignItems: "center",
						}}
					>
						<Typography fontSize={14}>{message}</Typography>
					</Alert>
				</Box>
			</Slide>
		</>
	);
}
