import { Box, Typography, Tooltip, Card, Button, Container, Backdrop } from "@mui/material"

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link } from "react-router-dom";

const BoxHeader = {
    height:{xs: 'none', md:'100vh'},
    paddingTop:4, paddingBottom:4, 
    background: "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(97,97,97,1) 59%, rgba(0,0,0,1) 100%)"
}

const IconsStyle = {
    textDecoration:"none", color:"#fff", cursor:"pointer", 
    mt:4,
    fontSize: {xs:'40px', lg:'50px'}
}


const IconsBox = () => {
    return (
        <>  
            <Box sx={{
                color:'#fff', 
                // mt:2,
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
            <Box sx={BoxHeader}>
                <Container>

                    {/* about me */}
                    <Box sx={{
                        // width:{md:'70%'}, 
                        color:'#fff',    
                    }}>
                        <Typography variant="h4">Gianmarco Garofalo</Typography>
                        <Typography variant="h5">Software Developer</Typography>
                        <Box sx={{
                            width:{md:'40%'},
                            backgroundColor:'#646464',
                            borderRadius:'10px',
                            padding:1,
                            // textAlign:{xs:'center', md:'left'}  ,
                            mt:2 
                            }}>
                            
                            <p>3+ years experience as Software Developer.</p>
                            <p>Expertise in Frontend, Backend, and cloud technologies.</p>
                            <p>Proficient in OOP, DOM, QA, Testing, Debugging.</p>
                            
                            <p>AWS Cloud Practicioner.</p>
                            
                            
                            
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

                    <IconsBox/>
                </Container>
            </Box>
        </>

    )
}