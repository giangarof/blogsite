import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios';
import {Container, Tooltip, Stack } from '@mui/material';
import Typography from '@mui/joy/Typography';

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Profile() {
  const {id} = useParams();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [isAdmin, setIsAdmin] = useState(Boolean)

  
  const fetchUser = async() => {
    const res = await axios.get(`/api/user/profile/${id}`);
    console.log(res)
    setName(res.data.user.name);
    setUsername(res.data.user.username);
    setEmail(res.data.user.email);
    setIsAdmin(res.data.user.isAdmin)
    // console.log(res)
    return res;
  }
  
  useEffect(() => {
    fetchUser()
  }, [id])

  const box = {
    color: '#fff'
  }
    
  return (
    <>
    {/* Profile */}
      <>
      <Container sx={{margin:10}} >
        <Typography sx={box} level="body-lg">Name: {name}</Typography>
        <Typography sx={box} level="body-lg">Email: {email}</Typography>
        <Typography  sx={box}level="body-lg">Username: {username}</Typography>
      
        {isAdmin === true ? (
          <>
          <Typography sx={box} level="body-lg">Admin: Administrator</Typography>
          <Stack display="flex" flexDirection="row" gap={4}>
            <Typography component="a" href="/new">
              <Tooltip title="Add new post">
                <AddIcon sx={box}/>
              </Tooltip>
            </Typography>
            <Typography  component="a" href="/adminpanel">
              <Tooltip title="Admin Panel">
                <AdminPanelSettingsIcon sx={box}/>
              </Tooltip>
            </Typography> 

            <Typography component="a" href="https://gigadev.onrender.com/">
              <Tooltip title='About me'>
                <AccountCircleIcon sx={box}/>
              </Tooltip>
            </Typography>
          </Stack>

          </>

        ) : (
          <Typography sx={box} level="body-lg">Admin: No Admin Privilege</Typography>
        )
          }

    
      </Container>
      </>      
    </>
  )
}
