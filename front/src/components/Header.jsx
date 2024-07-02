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
    gap:{xs:'10px'},
    // width: {sm:'100%'},
    padding:'4%',

}

const cardStyle = {
    display:'flex', flexDirection:'column', justifyContent:'center',
    width: {sm: '99%', md:'30%'}, 
    height: '250px',
    gap:'10px'
}

const IconsStyle = {
    textDecoration:"none", color:"#000", cursor:"pointer", 
    fontSize: {sm:'20px', lg:'60px'}
}

const btnStyle = {
    color:'#fff'
}

const view = {
    display:'flex', flexDirection:'row', justifyContent:'center',
    width: {sm: '50%', md:'20%'}
}

const descriptionBox = {
    width: {xs: '100%', md:'50%'},
    // width: 55%;
    height: '100px',
    marginTop: '20px',
    overflow: 'hidden',
    padding: '0 20px 0 20px',
    color:'#fff',
    letterSpacing: '1.3px',
    borderRadius: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
}

const lines = {
    height: '100px',
    whiteSpace: 'normal',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flexWrap: 'wrap',
    whiteSpace: 'normal',
}

const BoxDescription = () => {
    return (
        <Box>
            <Typography sx={lines} className="line">Welcome to my portfolio; feel free to check my projects.</Typography>
            <Typography sx={lines} className="line">I'm a software developer, data analyst, and cyber Analyst when it's about to find vulnerabilities.</Typography>
            <Typography sx={lines} className="line">Skillful in frontend and backend,  adept in databases both sql and nosql.</Typography>
            <Typography sx={lines} className="line">In the tech world; I'm a fullstack developer who enjoy to build websites using react, vue, and angular.</Typography>
            <Typography sx={lines} className="line">In the backend mostly I do use node.js with mongodb. 
                Nevertheles, I do also write python and sql.</Typography>
            <Typography sx={lines} className="line">For data analysis: excel, tableau, power bi, python and sql are my weapons.</Typography>
            <Typography sx={lines} className="line">Star Wars ambassador, The Big Bang Theory fan, lifelong learner.</Typography>
        </Box>
    )
}
const BoxInfo = () =>{
    return (
        <Box sx={boxStyle}>
            <Card sx={cardStyle} className="gradient">
                <span>Profile</span>
                <div className="show-card">
                    <Button sx={btnStyle} href="https://gigadev.onrender.com/" className="showed">Click</Button>
                    <p className="showed">A bit more about me and about what I do.</p>
                </div>
            </Card>
            <Card sx={cardStyle} className="gradient" >
                <span className="center">Projetcs</span>
                <div className="show-card" >
                    <Button sx={btnStyle} href="#AllPosts" className="showed">Click</Button>
                    <p className="showed">Check out some of my fullstack projects.</p>
                </div>
            </Card>
            <Card sx={cardStyle} className="gradient">
                <span className="center">My Blog</span>
                <div className="show-card" >
                    {/* <Button sx={btnStyle} className="showed">Click</Button> */}
                    <p className="showed">Under development</p>

                </div>
            </Card>
        </Box>
    )
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
export default function Header() {
    return (
        <>
            <Box 
                sx={BoxHeader}>
                <Box sx={boxStyle}>
                    <Box sx={view}>
                        <Box className="typing-effect">
                            <h1>Hello there!</h1>
                        </Box>
                    </Box>
                    <Box sx={descriptionBox}>
                        <BoxDescription/>
                    </Box>
                </Box>

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
                        <p>*Note: If you are a recruiter, drop me a message.</p>
                    </div>
                </Box>
            </Box>
        </>

    )
}