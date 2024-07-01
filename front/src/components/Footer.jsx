import { Container, Box, colors, Typography } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
export default function Footer() {
    const footerBar ={
    paddingTop:4, paddingBottom:4, 
    background: '#000',
    color: '#fff',
    
    }
    const containerDeco = {
        display:'flex', flexDirection: 'row', justifyContent: 'space-around',
        color:'none', textDecoration:'none'
    }

    const LinkIcons = () => {
        return (
            <Box>
                    <Typography component="a" href="https://github.com/giangarof98">
                    <GitHubIcon sx={{fontSize:'30px', textDecoration:"none", color:"#fff", cursor:"pointer"}}/>
                    </Typography>             

                    <Typography component="a" href="">      
                        <LinkedInIcon sx={{fontSize:'30px', textDecoration:"none", color:"#fff", cursor:"pointer"}}/>
                    </Typography>
            </Box>
        )
    }

    return (
        <>
        <Box sx={footerBar}>

            <Container sx={containerDeco}>
                <Box >
                    <Typography  
                        component='a' 
                        href="https://github.com/giangarof98"
                        sx={{textDecoration:"none", color:"white", cursor:"pointer"}}
                    >
                        Developed by: Myself
                    </Typography>

                </Box>
                <LinkIcons/>

            </Container>
        </Box>
        </>
    )
}