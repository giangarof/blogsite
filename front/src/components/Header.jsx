// MUI
import { Box, Typography, Tooltip, Button, Container } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// React
import { Link } from "react-router-dom";
import Message from "./Message";

const primaryBtn = {
  backgroundColor: "#000",
  color: "#fff",
  fontWeight: 600,
  px: 4,
  py: 1.5,
  borderRadius: "8px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#333"
  }
};

const secondaryBtn = {
  border: "2px solid #000",
  color: "#000",
  fontWeight: 600,
  px: 4,
  py: 1.5,
  borderRadius: "8px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#000",
    color: "#fff"
  }
};

export default function Header() {
  return (
    <Box sx={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f9f9f9",
      borderBottom: "1px solid #e0e0e0"
    }}>
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <Message />
        {/* Headline */}
        <Typography 
          variant="h2" 
          sx={{ color: "#222", fontWeight: 800, lineHeight: 1.2 }}
          gutterBottom
        >
          Gianmarco Garofalo
        </Typography>

        <Typography 
          variant="h5" 
          sx={{ color: "#555", mb: 2 }}
          gutterBottom
        >
          Software Engineer | Full Stack Developer
        </Typography>

        {/* Tagline */}
        <Typography 
          variant="body1" 
          sx={{ color: "#666", maxWidth: 600, mx: "auto", mb: 4 }}
        >
          I design and build scalable web & mobile applications with clean, maintainable code. 
          Skilled in modern frontend & backend frameworks, cloud platforms, and quality assurance.
        </Typography>

        {/* Buttons */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap", mb: 5 }}>
          <Link to="/projects">
            <Button sx={primaryBtn}>View Projects</Button>
          </Link>
          <Link to="/about">
            <Button sx={secondaryBtn}>About Me</Button>
          </Link>
          <Link to="/myblog">
            <Button sx={secondaryBtn}>My Blog</Button>
          </Link>
        </Box>

        {/* Social Icons */}
        <Box sx={{ display: "flex", gap: 3, justifyContent: "center" }}>
          <Tooltip title="GitHub">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
              <GitHubIcon sx={{ fontSize: 32, color: "#444", "&:hover": { color: "#1976d2" } }} />
            </a>
          </Tooltip>
          <Tooltip title="LinkedIn">
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
              <LinkedInIcon sx={{ fontSize: 32, color: "#444", "&:hover": { color: "#1976d2" } }} />
            </a>
          </Tooltip>
        </Box>

      </Container>
    </Box>
  );
}
