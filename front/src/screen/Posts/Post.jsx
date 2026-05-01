// React
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// MUI
import {
	Box,
	Card,
	Button,
	CardContent,
	CardMedia,
	Typography,
	Container,
	Link as MuiLink,
	Chip,
	Stack,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

// Dependencies
import axios from "axios";

// Components
import CopyLink from "../../components/CopyLink";
import CircularIndeterminate from "../../components/Spinner";
import Meta from "../../components/Meta";
import Message from "../../components/Message";

export default function PostDetail() {
	const [post, setPost] = useState(null);
	const [notFound, setNotFound] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false) || "";

	const { id } = useParams();
	const navigate = useNavigate();

	const fetchPost = async () => {
		setIsLoading(true);
		try {
			const { data } = await axios.get(`/api/post/${id}`);
			console.log(data);
			setPost(data.post);
		} catch (err) {
			setNotFound(err.response.data.message);
			console.log("Failed to fetch post:", err.response.data.message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleUpdatePost = () => navigate(`/post/update/${id}`);
	const handleGoBack = () => window.history.back();

	useEffect(() => {
		const profile = JSON.parse(localStorage.getItem("profile"));
		const isAdmin = profile?.isAdmin;
		if (profile?.isAdmin) {
			setIsAdmin(true);
		}
		fetchPost();
	}, [id]);

	if (isLoading) {
		return (
			<Container sx={{ mt: 3, textAlign: "center" }}>
				<CircularIndeterminate size={90} />
				<Typography mt={2}>Loading... Please wait</Typography>
			</Container>
		);
	}

	if (!post) {
		return (
			<Container
				maxWidth="md"
				sx={{
					minHeight: "100vh",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Box
					sx={{
						flex: 1, // 👈 pushes footer down
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Box
						sx={{
							textAlign: "center",
							p: 4,
							borderRadius: 3,
							maxWidth: 400,
							boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
						}}
					>
						<ErrorOutlineIcon
							sx={{ fontSize: 50, mb: 1, color: "text.secondary" }}
						/>

						<Typography variant="h6" fontWeight={600} gutterBottom>
							Post not found
						</Typography>

						<Typography variant="body2" color="text.secondary">
							{notFound || "The content you're looking for doesn't exist."}
						</Typography>
					</Box>
				</Box>
			</Container>
		);
	}

	return (
		<Container sx={{ mt: 3 }}>
			<Button variant="outlined" onClick={handleGoBack} sx={{ mb: 2 }}>
				Go Back
			</Button>

			<Meta title={post.title} description={post.description} />

			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					width: "100%",
				}}
			>
				<Card
					sx={{
						width: { xs: "95%", sm: "80%", md: "70%" },
						mt: 2,
						mb: 2,
						boxShadow: 3,
					}}
				>
					{/* Full image visible on all devices */}
					{post.image?.[0]?.url && (
						<CardMedia
							component="img"
							image={post.image[0].url}
							alt={post.title}
							sx={{
								width: "100%",
								height: "auto", // keeps natural aspect ratio
								maxHeight: "80vh", // optional: prevent extremely tall images
								objectFit: "contain", // ensures entire image is visible
							}}
						/>
					)}

					<CardContent
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: 2,
							backgroundColor: "rgba(0,0,0,0.08)",
						}}
					>
						<Typography variant="h5">{post.title}</Typography>
						<Typography variant="body1">{post.description}</Typography>

						<Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
							{post.repo && (
								<MuiLink
									href={post.repo}
									target="_blank"
									rel="noopener"
									underline="hover"
								>
									Github Code
								</MuiLink>
							)}
							{post.link && (
								<MuiLink
									href={post.link}
									target="_blank"
									rel="noopener"
									underline="hover"
								>
									Full Project
								</MuiLink>
							)}
						</Box>

						{/* Technologies as Pills */}
						{post.tech && (
							<Stack direction="row" spacing={1} flexWrap="wrap">
								{post.tech.split(",").map((techItem, index) => (
									<Chip
										key={index}
										label={techItem.trim()}
										color="primary"
										size="small"
									/>
								))}
							</Stack>
						)}

						<Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 1 }}>
							{isAdmin && (
								<Button variant="contained" onClick={handleUpdatePost}>
									Options
								</Button>
							)}
							<CopyLink />
						</Box>
					</CardContent>
				</Card>
			</Box>
		</Container>
	);
}
