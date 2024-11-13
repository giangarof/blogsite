import { 
  AppBar, 
  Toolbar, 
  Typography, Box, Tooltip, IconButton, Icon, Avatar, Stack, Container, Link as A, } from "@mui/material";
import img from '../assets/react.svg'

import { useEffect, useState } from "react";
import Logout from './Logout.jsx'
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";
  
export default function Navbar(props) {
  const [userInfo, setUserInfo] = useState(null)
  const [userId, setUserId] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const sx = {
    cursor:'pointer',
    color:'white'
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
                      <A to='/' component={Link} color="inherit" underline='none'>
                        <h2>Home</h2>
                      </A>
                    </Box>
                    <Box sx={{display:'flex', gap:'10px', alignItems:"center"}}>
                      <A to={`/profile/${userId}`} component={Link} color="inherit" underline='none' sx={sx}>
                        <h2>Profile</h2>
                      </A>
                      
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
                          justifyContent:{xs:"center",md:'space-between'},
                        }}>
                          <A to='/' component={Link} color="inherit" underline='none'>
                            <h2>Home</h2>
                          </A>
                          <A to='/projects' component={Link} color="inherit" underline='none'>
                          <h2>Projects</h2>
                          </A>
                          <A to='/now' component={Link} color="inherit" underline='none'>
                          <h2>News</h2>
                          </A>    
                        </Box>
                      </Box>
                    </Toolbar>
                  </Box>
                // </div>
              )}
            </>
        )
}



