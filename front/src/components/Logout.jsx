import React from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios';
import { 
    AppBar, 
    Toolbar, 
    // IconButton, 
    Typography, Box, Tooltip } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';


export default function Logout() {
    const navigate = useNavigate()
    const sx = {
      textDecoration:"none", color:'inherit'
      }

      const logout = async() => {
        const logoutUser = await axios.post('/api/user/logout')
        localStorage.removeItem('name')
        localStorage.removeItem('isAdmin')
        localStorage.removeItem('userId')
        console.log(logoutUser)
        navigate('/signin')
        location.reload()
      }
  return (
    <>
        <Typography sx={sx} component="a" onClick={logout}>
          <Tooltip title='Logout'>
            <LogoutIcon sx={{cursor:'pointer'}}/>
          </Tooltip>
        </Typography>
    </>

  )
}
