import { Button, Container, Typography, Box, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";

const outGrid = {
	py: 8,
	backgroundColor: "#000",
	color: "#fff",
	minHeight: "100vh",
};

export default function AboutMe() {
	const [user, setUser] = useState({ about: "" });

	const fetching = async () => {
		try {
			const res = await axios.get(`/api/user/aboutme`);
			// console.log(res);
			setUser({ about: res.data.user.about });
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetching();
	}, []);

	const sanitizedHTML = DOMPurify.sanitize(user.about);

	return (
		<Box sx={outGrid}>
			<Container maxWidth="md">
				<Link to="/">
					<Button
						variant="outlined"
						sx={{
							color: "#fff",
							borderColor: "#fff",
							mb: 4,
							"&:hover": { backgroundColor: "#fff", color: "#000" },
						}}
					>
						Go Back
					</Button>
				</Link>

				{/* Card-style container for contrast */}
				<Paper
					elevation={6}
					sx={{
						p: { xs: 3, md: 5 },
						borderRadius: 3,
						backgroundColor: "#111",
						color: "#fff",
						"& a": { color: "#90caf9", textDecoration: "underline" },
						"& p": { lineHeight: 1.6, mb: 2, fontSize: "1.1rem" },

						lineHeight: 1.7,
						// color: "text.secondary",

						"& ul, & ol": {
							paddingLeft: "1.8rem",
							margin: "0.5em 0",
						},

						"& li": {
							marginBottom: "6px",
						},

						// nested lists
						"& ul ul, & ol ol": {
							paddingLeft: "1.4rem",
						},

						// paragraphs spacing
						"& p": {
							margin: "0 0 10px",
						},
					}}
				>
					<Box dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
				</Paper>
			</Container>
		</Box>
	);
}
