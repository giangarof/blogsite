//react
import React from "react";

//mui
import {
	Box,
	Container,
	createTheme,
	Divider,
	Typography,
} from "@mui/material";
import { WidthFull } from "@mui/icons-material";

const box = {
	color: "white",
	paddingBottom: "2rem",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: "1rem",
	width: "100%",
};
const innerBox = {
	display: "flex",
	flexDirection: {
		xs: "column",
		sm: "row",
	},
	justifyContent: "space-around",
	gap: {
		xs: "2rem",
		sm: "5rem",
	},
};

const details = {
	display: "flex",
	flexDirection: "column",
	gap: {
		xs: ".4rem",
		sm: "1rem",
	},
};

export default function Cards() {
	return (
		<Container sx={box}>
			<Typography variant="h4">Competencies</Typography>
			<Container sx={innerBox}>
				<Box>
					<Typography variant="h5">Frontend</Typography>
					<Divider color={"#fff"} />
					<Box sx={details}>
						<Typography>React.js</Typography>
						<Typography>Next.js</Typography>
						<Typography>Vue.js</Typography>
						<Typography>HTML/CSS/Sass</Typography>
						<Typography>JavaScript/TypeScript</Typography>
					</Box>
				</Box>
				<Box>
					<Typography variant="h5">Backend</Typography>
					<Divider color={"#fff"} />
					<Box sx={details}>
						<Typography>Node.js/Express</Typography>
						<Typography>Java/Spring</Typography>
						<Typography>PHP/Laravel</Typography>
						<Typography>SQL/MySQL</Typography>
						<Typography>NoSQL/MongoDB</Typography>
					</Box>
				</Box>
				<Box>
					<Typography variant="h5">Testing</Typography>
					<Divider color={"#fff"} />
					<Box sx={details}>
						<Typography>Jest</Typography>
						<Typography>Vitest</Typography>
					</Box>
				</Box>
			</Container>
		</Container>
	);
}
