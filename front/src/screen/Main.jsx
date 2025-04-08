import React, { useState, useEffect } from "react"
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Meta from "../components/Meta.jsx";
import Carousel from "../components/Carousel.jsx";
import { Box, Tooltip, Typography } from "@mui/material";

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const BoxHeader = {
    height:{xs: 'none'},
    paddingTop:4, paddingBottom:4, 
    background: "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(97,97,97,1) 59%, rgba(0,0,0,1) 100%)"
}

const IconsStyle = {
    textDecoration:"none", color:"#fff", cursor:"pointer", 
    mt:4,
    fontSize: {xs:'40px', lg:'50px'}
}

const btns = {
    border:'2px #fff solid',
    color:"#fff",
    '&:hover': {
        backgroundColor:'#fff',
        color:'#000'
    },
    width: {xs:'100%'},
}

const IconsBox = () => {
    return (
        <>  
            <Box sx={{
                color:'#fff', 
                pb:3,
                display:'flex', flexDirection:'column', alignItems:'center'
            }}>
                <Box sx={{display:'flex', gap:4}}>
                    <Tooltip title="Github Link">
                        <Typography component="a" role='link' href="https://github.com/giangarof" aria-label="Github link">
                        <GitHubIcon sx={IconsStyle}/>
                        </Typography>             
                    </Tooltip>

                    <Tooltip title="LinkedIn Link">
                        <Typography component="a" role='link' href="https://www.linkedin.com/in/gianmarco-g/" aria-label="LinkedIn link">      
                            <LinkedInIcon sx={IconsStyle}/>
                        </Typography>
                    </Tooltip>
                </Box>
                <Box sx={{
                    mt:{xs:1, md:1},
                    textAlign:{xs:"center", md:'left'}
                    
                    }}>
                    <p>Feel free to reach me out for jobs and project purposes.</p>
                    <p>*Note: If you are a recruiter, drop me a message.</p>                     
                </Box>
            </Box>
        </>
    )
}

export default function Main() {



    return(
        <>  
            <Box sx={BoxHeader}>

                <Meta />
                <Header/>
                <Carousel/>
                <IconsBox />
                <Footer/>        
            </Box>
        </>
    )
}       