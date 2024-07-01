import { Box, Typography,Tooltip, Card, Button, Container } from "@mui/material"

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const BoxHeader = {
    marginBottom:4,
    textAlign:'center',
    paddingTop:4, paddingBottom:4, 
    background:"linear-gradient(0deg, rgba(217,226,223,1) 0%, rgba(254,254,254,1) 28%, rgba(74,113,187,1) 100%)"
}

const boxStyle = {
    display:'flex',
    flexDirection:{xs: 'column',md:'row'},
    justifyContent:{sm: 'center', md:'space-around'},
    alignItems:{sm:'center'},
    gap:{xs:'10px', sm:'10px'},
    // width: '100%',
    padding:'4%',

}

const cardStyle = {
    display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center',
    width: {sm: '99%', md:'30%'}, 
    height: '200px',
    gap:'10px'
    
}

const IconsStyle = {
    textDecoration:"none", color:"#000", cursor:"pointer", 
    fontSize: {sm:'20px', lg:'60px'}
}

const IconsBox = () => {
    return (
        <>
        <Typography component="a" href="https://github.com/giangarof98">
        <GitHubIcon sx={IconsStyle}/>
        </Typography>             

        <Typography component="a" href="">      
            <LinkedInIcon sx={IconsStyle}/>
        </Typography>
        </>
    )
}


const BoxInfo = () =>{
    return (
        <Box sx={boxStyle}>
            <Card sx={cardStyle}>
                <span>Profile</span>
                <Button href="https://gigadev.onrender.com/">Click</Button>
            </Card>
            <Card sx={cardStyle}>
                <span>Projetcs</span>
                <Button href="#AllPosts">Click</Button>
            </Card>
            <Card sx={cardStyle}>
                <span>My Blog</span>
                {/* <Button>Click</Button> */}
                <h2>Under development</h2>
            </Card>
        </Box>
    )
}
export default function Header() {
    return (
        <>
            <Box 
                
                sx={BoxHeader}>
                <Container sx={{width:'100%', textAlign:'start'}}>

                    <h1>Hello there!</h1>
                    <p>Welcome to my portfolio; feel free to check my projects. </p>
                    <p>I'm a Fullstack Developer, Data Analyst, and Cyber Analyst when it's about to find vulnerabilities.</p>
                    <p>Skillful in frontend and backend,  adept in databases both SQL and NoSQL</p>
                    <p>Star Wars ambassador, The Big Bang Theory fan, lifelong learner</p>
                    <p> </p>
                </Container>

                <Box>
                    <BoxInfo/>
                    <p>My social media</p>
                    <Box sx={{
                        display:'flex', 
                        // flexDirection:"row", 
                        justifyContent:'center', 
                        gap:'20px',
                        padding:'15px'
                    }}
                    >
                        <IconsBox/>
                    </Box>
                    <div>
                        <p>Feel free to reach me out for jobs and project purposes.</p>
                    </div>
                </Box>
            </Box>
        </>

    )
}