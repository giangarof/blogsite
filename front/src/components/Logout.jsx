import React from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios';
import { 
    AppBar, 
    Toolbar, 
    // IconButton, 
    Typography, Box } from "@mui/material";


export default function Logout() {
    const navigate = useNavigate()
    const sx = {
        m:2, textDecoration:"none", color:'inherit'
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
        <Typography sx={sx} component="a" onClick={logout}>Logout</Typography>
    </>

  )
}
