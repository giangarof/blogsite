import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";

import {
	Container,
	Paper,
	Stack,
	Box,
	Typography,
	Link as MuiLink,
	Divider,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import "react-quill/dist/quill.snow.css";

export default function Profile() {
	const { id } = useParams();
	const [user, setUser] = useState({
		name: "",
		username: "",
		email: "",
		about: "",
		isAdmin: false,
	});

	// Fetch user info
	const fetchUser = async () => {
		try {
			const res = await axios.get(`/api/user/profile`);
			const data = res.data.user;
			setUser({
				name: data.name,
				username: data.username,
				email: data.email,
				about: data.about,
				isAdmin: data.isAdmin,
			});
		} catch (err) {
			console.error("Failed to fetch user:", err.message);
		}
	};

	useEffect(() => {
		fetchUser();
	}, [id]);

	const sanitizedAbout = DOMPurify.sanitize(user.about);

	return (
		<Container maxWidth="md" sx={{ py: 6 }}>
			<Stack spacing={4}>
				{/* 👤 Profile Header */}
				<Paper
					elevation={3}
					sx={{
						p: 4,
						borderRadius: 3,
						display: "flex",
						alignItems: "center",
						gap: 3,
					}}
				>
					<Box>
						<Typography variant="h5" fontWeight={600}>
							{user.name}
							{user.isAdmin && (
								<Typography
									component="span"
									sx={{
										ml: 1,
										fontSize: 14,
										color: "primary.main",
										fontWeight: 500,
									}}
								>
									Admin
								</Typography>
							)}
						</Typography>

						<Typography variant="body2" color="text.secondary">
							@{user.username}
						</Typography>

						<Typography variant="body2" color="text.secondary">
							{user.email}
						</Typography>
					</Box>
				</Paper>

				{/* About Section */}
				{user.about && (
					<Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
						<Typography variant="subtitle1" fontWeight={600} mb={1}>
							About
						</Typography>

						<Typography
							variant="body2"
							component="div"
							dangerouslySetInnerHTML={{ __html: sanitizedAbout }}
							sx={{
								lineHeight: 1.7,
								color: "text.secondary",

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
						/>
					</Paper>
				)}

				{/* 🛠 Admin Section */}
				<Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
					<Typography variant="subtitle1" fontWeight={600} mb={2}>
						Dashboard
					</Typography>

					{user.isAdmin ? (
						<Stack spacing={3}>
							{/* Projects */}
							<Box>
								<Typography variant="body2" fontWeight={600} mb={1}>
									Projects
								</Typography>

								<Stack direction="row" spacing={2} flexWrap="wrap">
									<ActionButton
										to="/new"
										icon={<AddIcon />}
										text="Add Project"
									/>
									<ActionButton
										to="/adminpanel"
										icon={<AdminPanelSettingsIcon />}
										text="Admin Panel"
									/>
								</Stack>
							</Box>

							{/* Blog */}
							<Box>
								<Typography variant="body2" fontWeight={600} mb={1}>
									Blog
								</Typography>

								<Stack direction="row" spacing={2} flexWrap="wrap">
									<ActionButton
										to="/new-note"
										icon={<CreateIcon />}
										text="Add Note"
									/>
									<ActionButton
										to="/adminpanel-notes"
										icon={<AdminPanelSettingsIcon />}
										text="Notes Panel"
									/>
								</Stack>
							</Box>

							{/* Profile */}
							<Box>
								<Typography variant="body2" fontWeight={600} mb={1}>
									Profile
								</Typography>

								<Stack direction="row" spacing={2}>
									<ActionButton
										to="/user/update"
										icon={<ManageAccountsIcon />}
										text="Update Profile"
									/>
								</Stack>
							</Box>
						</Stack>
					) : (
						<Typography variant="body2" color="text.secondary">
							You don’t have admin privileges.
						</Typography>
					)}
				</Paper>
			</Stack>
		</Container>
	);
}

// Reusable Action Button Component
function ActionButton({ to, icon, text }) {
	return (
		<MuiLink component={Link} to={to} underline="none">
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: 0.5,
					p: 1.5,
					borderRadius: 2,
					boxShadow: 1,
					cursor: "pointer",
					transition: "0.2s",
					"&:hover": {
						boxShadow: 3,
						backgroundColor: "rgba(0,0,0,0.05)",
					},
				}}
			>
				{icon}
				<Typography variant="body2">{text}</Typography>
			</Box>
		</MuiLink>
	);
}
