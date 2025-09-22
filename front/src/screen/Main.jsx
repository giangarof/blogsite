import React from "react";

// Components
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Meta from "../components/Meta.jsx";
import Carousel from "../components/Carousel.jsx";
import Cards from "../components/Cards.jsx";

// MUI
import { Box, Tooltip, Typography } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const BoxHeader = {
    minHeight: '100vh',
    background: "#000",
    color: "#fff",
    fontFamily: 'Roboto, sans-serif',
};

const IconsStyle = {
    color: "#fff",
    cursor: "pointer",
    fontSize: { xs: 40, md: 50 },
    transition: 'all 0.3s ease',
    '&:hover': { transform: 'scale(1.2)', color: '#90caf9' }
};

const IconsBox = () => (
    <Box sx={{
        color:'#fff', 
        py: 6,
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    }}>
        <Box sx={{ display:'flex', gap: 6 }}>
            <Tooltip title="Github Link">
                <Typography component="a" href="https://github.com/giangarof" aria-label="Github link">
                    <GitHubIcon sx={IconsStyle}/>
                </Typography>             
            </Tooltip>
            <Tooltip title="LinkedIn Link">
                <Typography component="a" href="https://www.linkedin.com/in/gianmarco-g/" aria-label="LinkedIn link">      
                    <LinkedInIcon sx={IconsStyle}/>
                </Typography>
            </Tooltip>
        </Box>
        <Box sx={{ mt: 4, textAlign: 'center', maxWidth: 600 }}>
            <Typography variant="body1" sx={{ mb: 1, color:'#fff', opacity: 0.8 }}>
                Feel free to reach out for jobs and project purposes.
            </Typography>
            <Typography variant="body2" sx={{ color:'#fff', opacity: 0.6 }}>
                *Note: If you are a recruiter, drop me a message.
            </Typography>
        </Box>
    </Box>
);

export default function Main() {
    return (
        <Box sx={BoxHeader}>
            <Meta />
            <Header />
            
            {/* Carousel Section */}
            <Box sx={{ py: 8 }}>
                <Carousel />
            </Box>
            
            {/* Cards Section */}
            <Box sx={{ py: 8 }}>
                <Cards />
            </Box>
            
            {/* Social & Contact Section */}
            <IconsBox />

            {/* Footer
            <Footer /> */}
        </Box>
    )
}

       