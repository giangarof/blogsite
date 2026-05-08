import React, { useState, useEffect } from "react";
import {
	Box,
	Typography,
	IconButton,
	CircularProgress,
	Container,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import axios from "axios";

export default function CarouselBox() {
	const [loading, setLoading] = useState(true);
	const [posts, setPosts] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [visibleSlides, setVisibleSlides] = useState(3);

	// Fetch posts
	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const res = await axios.get("/api/post/");
				setPosts(res.data.slice(-6).reverse());
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};
		fetchPosts();
	}, []);

	// Handle responsive slides
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 600)
				setVisibleSlides(1); // mobile
			else if (window.innerWidth < 900)
				setVisibleSlides(2); // tablet
			else setVisibleSlides(3); // desktop
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % posts.length);
	const prevSlide = () =>
		setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);

	// Auto-slide
	useEffect(() => {
		if (!posts.length) return;
		const interval = setInterval(nextSlide, 4000);
		return () => clearInterval(interval);
	}, [posts]);

	if (loading) {
		return (
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: 2,
					py: 6,
					backgroundColor: "#000",
				}}
			>
				<CircularProgress />
				<Typography variant="h6" color="white">
					Loading Carousel...
				</Typography>
			</Box>
		);
	}

	const slideWidth = 100 / visibleSlides;

	return (
		<Container maxWidth="xl" sx={{ py: 10 }}>
			<Typography
				variant="h3"
				sx={{
					textAlign: "center",
					mb: 6,
					color: "white",
					fontWeight: 700,
					letterSpacing: 1,
				}}
			>
				Latest Projects
			</Typography>

			<Box
				sx={{
					position: "relative",
					overflow: "hidden",
					px: { xs: 1, md: 6 },
				}}
			>
				{/* Slides */}
				<Box
					sx={{
						display: "flex",
						transition: "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
						transform: `translateX(-${currentIndex * slideWidth}%)`,
					}}
				>
					{posts.concat(posts).map((post, idx) => {
						const isActive = idx === currentIndex;

						return (
							<Box
								key={idx}
								sx={{
									minWidth: `${slideWidth}%`,
									p: 2,
									boxSizing: "border-box",
									transition: "all 0.5s ease",
									transform: isActive ? "scale(1)" : "scale(0.95)",
									opacity: isActive ? 1 : 0.7,
								}}
							>
								<Box
									sx={{
										position: "relative",
										borderRadius: "28px",
										overflow: "hidden",
										height: 420,
										backdropFilter: "blur(12px)",
										background:
											"linear-gradient(to top, rgba(0,0,0,0.45), rgba(0,0,0,0.1), transparent)",
										border: "1px solid rgba(255,255,255,0.08)",
										boxShadow: "0 10px 40px rgba(0, 0, 0, 0.35)",
										transition: "all 0.4s ease",
										"&:hover": {
											transform: "translateY(-8px)",
											boxShadow: "1px 1px 10px 10px rgba(255, 255, 255, 0.45)",
										},
									}}
								>
									{/* Image */}
									<Box
										sx={{
											position: "relative",
											height: "100%",
											overflow: "hidden",
										}}
									>
										<img
											src={post.image[0].url}
											alt={post.description}
											style={{
												width: "100%",
												height: "100%",
												objectFit: "contain",
												backgroundColor: "#111",
											}}
										/>

										{/* Gradient Overlay */}
										<Box
											sx={{
												position: "absolute",
												inset: 0,
												background:
													"linear-gradient(to top, rgb(1, 1, 1), rgba(39, 38, 38, 0.52), transparent)",
											}}
										/>

										{/* Content */}
										<Box
											sx={{
												position: "absolute",
												bottom: 0,
												width: "100%",
												p: 3,
												zIndex: 2,
											}}
										>
											<Typography
												variant="h6"
												sx={{
													color: "white",
													fontWeight: 600,
													// // mb: 3,
													// whiteSpace: "nowrap",
													// overflow: "hidden",
													// textOverflow: "ellipsis",
												}}
											>
												{post.description.length > 40
													? `${post.description.slice(0, 60)}...`
													: post.description}
											</Typography>

											<Typography
												component="a"
												href={`/post/${post._id}`}
												sx={{
													color: "#90caf9",
													textDecoration: "none",
													fontWeight: 500,
													transition: "0.3s",
													"&:hover": {
														color: "#fff",
													},
												}}
											>
												View Project →
											</Typography>
										</Box>
									</Box>
								</Box>
							</Box>
						);
					})}
				</Box>

				{/* Left Arrow */}
				<IconButton
					onClick={prevSlide}
					sx={{
						position: "absolute",
						top: "50%",
						left: { xs: 4, md: 16 },
						transform: "translateY(-50%)",
						width: 52,
						height: 52,
						bgcolor: "rgba(255,255,255,0.08)",
						backdropFilter: "blur(10px)",
						color: "white",
						border: "1px solid rgba(255,255,255,0.1)",
						"&:hover": {
							bgcolor: "rgba(255,255,255,0.18)",
						},
					}}
				>
					<ArrowBackIos />
				</IconButton>

				{/* Right Arrow */}
				<IconButton
					onClick={nextSlide}
					sx={{
						position: "absolute",
						top: "50%",
						right: { xs: 4, md: 16 },
						transform: "translateY(-50%)",
						width: 52,
						height: 52,
						bgcolor: "rgba(255,255,255,0.08)",
						backdropFilter: "blur(10px)",
						color: "white",
						border: "1px solid rgba(255,255,255,0.1)",
						"&:hover": {
							bgcolor: "rgba(255,255,255,0.18)",
						},
					}}
				>
					<ArrowForwardIos />
				</IconButton>

				{/* Dots */}
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						mt: 4,
						gap: 1,
					}}
				>
					{posts.map((_, idx) => (
						<Box
							key={idx}
							onClick={() => setCurrentIndex(idx)}
							sx={{
								width: currentIndex === idx ? 28 : 10,
								height: 10,
								borderRadius: 10,
								bgcolor:
									currentIndex === idx ? "#90caf9" : "rgba(255,255,255,0.3)",
								transition: "all 0.3s ease",
								cursor: "pointer",
							}}
						/>
					))}
				</Box>
			</Box>
		</Container>
	);
}
