import { Box, Typography,Tooltip, Card, Button, Container, Backdrop } from "@mui/material"

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useEffect, useState } from "react";
import axios from "axios";

const BoxHeader = {
    marginBottom:4,
    textAlign:'center',
    paddingTop:4, paddingBottom:4, 
    // background: "#000"
    background: "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(97,97,97,1) 59%, rgba(0,0,0,1) 100%)"
    // background:"linear-gradient(0deg, rgba(217,226,223,1) 0%, rgba(254,254,254,1) 28%, rgba(74,113,187,1) 100%)"
}

const boxStyle = {
    display:'flex',
    flexDirection:{xs: 'column',md:'row'},
    justifyContent:{sm: 'center', md:'space-around'},
    alignItems:{sm:'center'},
    gap:{xs:'10px'},
    padding:'4%',

}

const cardStyle = {
    display:'flex', flexDirection:'column', justifyContent:'center',
    width: {sm: '99%', md:'30%'}, 
    height: '250px',
    gap:'10px', color:'#fff'
    
}

const IconsStyle = {
    textDecoration:"none", color:"#fff", cursor:"pointer", 
    fontSize: {sm:'20px', lg:'60px'}
}

const btnStyle = {
    color:'#fff',
    backgroundColor:'rgba(0,0,0, .1)'
}

const view = {
    color:"#fff",
    display:'flex', flexDirection:'row', justifyContent:'center',
    letterSpacing:'4px',
    width: {sm: '50%', md:'20%'}
}

const descriptionBox = {
    width: {xs: '100%', md:'50%'},
    padding:'15px',
    color:'#fff',
    borderRadius: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
}

const BoxDescription = () => {
    const [user, setUser] = useState('')
    const userId = localStorage.getItem('userId')

    const fetching = async() => {
        const res = await axios.get(`/api/user/profile/${userId}`)
    
        setUser(res.data.user)
    }

    useEffect(() => {
        fetching()
    },[])


    return (
        <Box>
            <Typography>{user.about}</Typography>
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
                <span className="center">Now</span>
                <div className="show-card" >
                    <Button sx={btnStyle} href="/now" className="showed">Click</Button>
                    <p className="showed">What I'm doing now</p>

                </div>
            </Card>
        </Box>
    )
}


const IconsBox = () => {
    return (
        <>
            <Typography component="a" href="https://github.com/giangarof">
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
                        {/* <Box className="typing-effect">
                            <h1>Hello there!</h1>
                        </Box> */}
                        <Box>
                            <h1>Hello, World!</h1>
                        </Box>
                    </Box>
                    <Box sx={descriptionBox}>
                        <BoxDescription/>
                    </Box>
                </Box>

                <Box sx={{color:"#fff"}}>
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