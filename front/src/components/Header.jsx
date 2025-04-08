//MUI
import { Box, Typography, Tooltip, Card, Button, Container, Backdrop } from "@mui/material"
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// React
import { Link } from "react-router-dom";
import Message from "./Message";

const btns = {
    border:'2px #fff solid',
    color:"#fff",
    '&:hover': {
        backgroundColor:'#fff',
        color:'#000'
    },
    width: {xs:'100%'},
}

export default function Header() {
    
    return(
        <>
            <Box>
                <Container>
                    {/* about me */}
                    <Box sx={{
                        // width:{md:'70%'}, 
                        color:'#fff',    
                    }}>
                        <Typography variant="h4">Gianmarco Garofalo</Typography>
                        <Typography variant="h5">Software Developer</Typography>
                        <Message />
                        <Box sx={{
                            width:{md:'40%'},
                            backgroundColor:'#646464',
                            borderRadius:'10px',
                            padding:1,
                            // textAlign:{xs:'center', md:'left'}  ,
                            mt:2 
                            }}>
                            
                            <p>Full Stack Software Developer.</p>
                            <p>Expertise in OOP, QA, DOM, Testing, Degugging, SEO, and more.</p>
                            <p>Skilled in frontend and backend.</p>
                            <p>Web and mobile developer.</p>
                            <p>AWS and Azure certified.</p>
                        </Box>
                    </Box>



                    {/* btns  */}
                    <Box sx={{
                        display: {xs:"flex", md:'flex'},
                        flexDirection: {xs:"column", sm:'row'},
                        width: {xs:'100%'},  
                        gap:{xs:1, md:4}, 
                        mt:4,
                        
                        }}>
                        <Link to='/projects'>
                            <Button sx={btns}>Projects</Button>
                        </Link>
                        <Link to="/myblog">
                            <Button sx={btns}>My Blog</Button>
                        </Link>
                        <Link to="/about">
                            <Button sx={btns}>About Me</Button>
                        </Link>
                    </Box>

                    {/* <IconsBox/> */}
                </Container>
            </Box>
        </>

    )
}