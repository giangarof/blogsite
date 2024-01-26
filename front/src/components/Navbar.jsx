import { 
  AppBar, 
  Toolbar, 
  Typography, Box, Tooltip, IconButton, Icon, Avatar, Stack } from "@mui/material";
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
    m:2, textDecoration:"none", color:'inherit'
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
              <AppBar 
                sx={{
                  position:'sticky'
                }}>
                <Toolbar display="center">
                <Typography variant="h4">
                  <Avatar alt="React logo" src={img} />
                </Typography>
                  <Box 
                    // sx={{ display:'flex'}} 
                    >
                    <Typography sx={sx} component="a" href="/home">
                      <Tooltip title='login'>
                        <HomeIcon/>
                      </Tooltip>
                    </Typography>
                    {isAdmin == true ? 
                      <>
                        <Typography sx={sx} component="a" href="/adminpanel">
                          <Tooltip title="Admin Panel">
                            <AdminPanelSettingsIcon/>
                          </Tooltip>
                        </Typography> 
                      </> : ''
                    }
                    <Typography sx={sx} component="a" href={`/profile/${userId}`}>
                      <Tooltip title='Profile'>
                        <PersonIcon/>
                      </Tooltip>
                    </Typography>
                    <Typography sx={sx} component="a" href="https://gigadev.onrender.com/">
                        <Tooltip title='About me'>
                          <AccountCircleIcon/>
                        </Tooltip>
                      </Typography>
                    <Logout/>
                  </Box>
                </Toolbar>
              </AppBar>
              ): (
                // <div>
                  <AppBar position="static">
                    <Toolbar display="center">
                      <Typography variant="h4">
                        RNET
                      </Typography>
                    <Box sx={{ display:'flex', m:2}} >
                      <Typography sx={sx} component="a" href="/home">
                        <Tooltip title='login'>
                            <HomeIcon/>
                        </Tooltip>
                      </Typography>
                      {/* <Typography sx={sx} component="a" href="/signup">Register</Typography> */}
                      <Typography sx={sx} component="a" href="https://gigadev.onrender.com/">
                        <Tooltip title='About me'>
                          <AccountCircleIcon/>
                        </Tooltip>
                      </Typography>
                      <Typography sx={sx} component="a" href="/signin">
                        <Tooltip title='Login'>
                          <LoginIcon/>
                        </Tooltip>
                      </Typography>
                    </Box>
                    </Toolbar>
                  </AppBar>
                // </div>
              )}
            </>
        )
}



