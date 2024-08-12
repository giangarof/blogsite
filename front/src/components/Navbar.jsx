import { 
  AppBar, 
  Toolbar, 
  Typography, Box, Tooltip, IconButton, Icon, Avatar, Stack, Container } from "@mui/material";
import img from '../assets/react.svg'

import { useEffect, useState } from "react";
import Logout from './Logout.jsx'
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
  
export default function Navbar(props) {
  const [userInfo, setUserInfo] = useState(null)
  const [userId, setUserId] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const sx = {
    textDecoration:"none", color:'inherit'
  }
  
  useEffect(() => {
    const name = localStorage.getItem('name')
    const id = localStorage.getItem('userId')
    const isAdmin = JSON.parse(localStorage.getItem('isAdmin'))
    setUserInfo(name)
    setUserId(id)
    setIsAdmin(isAdmin)

  }, [])

        return(
            <>
              {userInfo ? (
              <Box sx={{backgroundColor:"#000", color:'#fff'}}>
                <Toolbar sx={{backgroundColor:"#000", color:'#fff'}}>
                  <Box sx={{ display:'flex', justifyContent:'space-between', width:'100%'}} >
                    <Box sx={{ display:'flex', gap:'10px'}}>
                      <Typography sx={sx} component="a" href="/">
                        <h2>Home</h2>
                      </Typography>
                      {/* <Typography sx={sx} component="a" href="https://gigadev.onrender.com/">
                        <h2>About Me</h2>
                      </Typography> */}
                      {/* <Typography sx={sx} component="a" href="/#AllPosts">
                        <h2>Projects</h2>
                      </Typography> */}
                      {/* <Typography sx={sx} component="a" href="/now">
                        <h2>Now</h2>
                      </Typography> */}
                    </Box>
                    <Box sx={{display:'flex', gap:'10px', alignItems:"center"}}>
                      <Typography sx={sx} component="a" href={`/profile/${userId}` }>
                        <h2>Profile</h2>
                      </Typography>
                      
                      <Typography sx={sx}>
                        <Logout/>
                      </Typography>
                    </Box>
                  </Box>
                </Toolbar>
              </Box>
              ) : (
                // <div>
                  <Box sx={{backgroundColor:"#000", color:'#fff'}}>
                    <Toolbar sx={{backgroundColor:"#000", color:'#fff'}}>
                      <Box sx={{
                          display:'flex', 
                          justifyContent:'space-between', 
                          width:'100%', textAlign:'center'
                        }}>
                        <Box sx={{
                          display:'flex',
                          gap:'10px',
                          flexDirection:'row',
                          // justifyContent:{xs:"center",md:'space-between'},
                        }}>
                          <Typography sx={sx} component="a" href="/">
                            <h2>Home</h2>
                          </Typography>
                          {/* <Typography sx={sx} component="a" href="https://gigadev.onrender.com/">
                            <h2>About Me</h2>
                          </Typography>
                          <Typography sx={sx} component="a" href="/#AllPosts">
                            <h2>Projects</h2>
                          </Typography>
                          <Typography sx={sx} component="a" href="/now">
                            <h2>Now</h2>
                          </Typography> */}
                        </Box>
                        <Box>
                          <Typography sx={sx} component="a" href="/signin">
                            <h2>Login</h2>
                          </Typography>
                        </Box>
                        {/* <Typography sx={sx} component="a" href="/">
                          <Tooltip title='login'>
                              <HomeIcon/>
                          </Tooltip>
                        </Typography>
                        <Typography sx={sx} component="a" href="/signup">Register</Typography>
                        <Typography sx={sx} component="a" href="https://gigadev.onrender.com/">
                          <Tooltip title='About me'>
                            <AccountCircleIcon/>
                          </Tooltip>
                        </Typography>
                        <Typography sx={sx} component="a" href="/signin">
                          <Tooltip title='Login'>
                            <LoginIcon/>
                          </Tooltip>
                        </Typography> */}
                      </Box>
                    </Toolbar>
                  </Box>
                // </div>
              )}
            </>
        )
}



