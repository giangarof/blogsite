//react
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//dependencies
import axios from "axios";

//MUI
import { Textarea } from "@mui/joy";
import {
	Box,
	Card,
	Button,
	CardContent,
	CardMedia,
	Typography,
	Tooltip,
	Hidden,
	Grid,
	TextField,
} from "@mui/material";

//components
import CircularIndeterminate from "../../components/Spinner";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../quill.css";

const UserUpdate = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const fontOptions = [
		{ label: "Sans Serif", value: "sans-serif" },
		{ label: "Serif", value: "serif" },
		{ label: "Monospace", value: "monospace" },
	];

	const toolbarOptions = [
		[{ font: fontOptions.map((option) => option.value) }],
		[{ header: [1, 2, false] }], // Headers
		["bold", "italic", "underline", "strike"], // Text styles
		["blockquote", "code-block"], // Block formats
		[{ list: "ordered" }, { list: "bullet" }], // Lists
		[{ script: "sub" }, { script: "super" }], // Subscript/Superscript
		[{ indent: "-1" }, { indent: "+1" }], // Indent/Outdent
		[{ direction: "rtl" }], // Text direction
		[{ color: [] }, { background: [] }], // Color dropdowns
		[{ align: [] }], // Text alignment
		["clean"], // Clear formatting button
		["link", "image", "video"], // Insert link/image/video
	];

	// data to update
	const [user, setUser] = useState({
		name: "",
		username: "",
		email: "",
		about: "",
	});
	const fetching = async () => {
		var res = await axios.get(`/api/user/profile`);

		var dataUser = res.data.user;

		setUser((prev) => ({
			...prev,
			name: dataUser.name || "",
			username: dataUser.username || "",
			email: dataUser.email || "",
			about: dataUser.about || "",
		}));
	};

	// const profile = JSON.parse(localStorage.getItem('profile'));
	useEffect(() => {
		fetching();
	}, []);

	const handleChange = (e) => {
		setUser((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const submitUpdate = async () => {
		setIsLoading(true);
		try {
			const formData = {
				name: user.name,
				username: user.username,
				email: user.email,
				about: user.about,
			};

			const res = await axios.put(`/api/user/profile`, formData);
			const message = res.data.message;
			sessionStorage.setItem("notification", message);
			navigate(`/profile`);
			// location.reload();
			// console.log(res.data);
		} catch (error) {
			// sessionStorage.setItem("notification", message);
			console.log(error.response.data.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Grid container justifyContent="center">
			<Box
				sx={{
					mt: 6,
					mb: 6,
					width: { xs: "95%", md: "600px" },
				}}
			>
				<Card
					elevation={3}
					sx={{
						p: 4,
						borderRadius: 3,
					}}
				>
					<CardContent>
						<Typography variant="h5" fontWeight={600} mb={3}>
							Update Profile
						</Typography>

						<Grid container spacing={3}>
							{/* Name */}
							<Grid item xs={12}>
								<TextField
									fullWidth
									label="Name"
									name="name"
									value={user.name}
									onChange={handleChange}
								/>
							</Grid>

							{/* Username */}
							<Grid item xs={12}>
								<TextField
									fullWidth
									label="Username"
									name="username"
									value={user.username}
									onChange={handleChange}
								/>
							</Grid>

							{/* Email */}
							<Grid item xs={12}>
								<TextField
									fullWidth
									label="Email"
									name="email"
									value={user.email}
									onChange={handleChange}
								/>
							</Grid>

							{/* Password */}
							{/* <Grid item xs={12}>
								<TextField
									fullWidth
									label="New Password"
									name="password"
									type="password"
									value={user.password}
									onChange={handleChange}
									helperText="Leave blank to keep current password"
								/>
							</Grid> */}

							{/* Admin info */}
							{/* <Grid item xs={12}>
								<Typography variant="body2" color="text.secondary">
									Admin: {user.isAdmin ? "Yes" : "No"}
								</Typography>
							</Grid> */}

							{/* About */}
							<Grid item xs={12}>
								<Typography variant="subtitle2" mb={1}>
									About
								</Typography>

								<Box className="editor-shell">
									<ReactQuill
										className="quill-editor"
										value={user.about || ""}
										onChange={(value) =>
											setUser((prev) => ({
												...prev,
												about: value,
											}))
										}
										theme="snow"
										modules={{ toolbar: toolbarOptions }}
									/>
								</Box>
							</Grid>

							{/* Submit */}
							<Grid item xs={12}>
								<Button
									fullWidth
									variant="contained"
									onClick={submitUpdate}
									disabled={isLoading}
									sx={{
										py: 1.2,
										borderRadius: 2,
										textTransform: "none",
										fontWeight: 500,
									}}
								>
									{isLoading ? <CircularIndeterminate /> : "Update Profile"}
								</Button>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</Box>
		</Grid>
	);
};

export default UserUpdate;
