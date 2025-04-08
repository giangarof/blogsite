import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios';
import {Container, Tooltip, Stack,Box } from '@mui/material';
import Typography from '@mui/joy/Typography';

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CreateIcon from '@mui/icons-material/Create';

export default function Profile() {
  const {id} = useParams();
  const [user, setUser] = useState({
    name: '',
    username: '',
    email:'',
    about:'',
    isAdmin: Boolean
  })
  
  const fetchUser = async() => {
    const res = await axios.get(`/api/user/profile/${id}`);
    const data = res.data.user;
    setUser({
      name: data.name,
      username: data.username,
      email: data.email,
      about: data.about,
      isAdmin: data.isAdmin
    })
    return res;
  }
  
  useEffect(() => {
    fetchUser()
  }, [id])

  const box = {
    display:'flex', flexDirection:'column', gap:'1rem',
    // backgroundColor:'red',
    // width:'500px'
  }

  const container = {
    borderRadius:'8px',
    margin:'10px',
    backgroundColor:'rgba(0,0,0,0.07)',
    padding:'10px',
    width:'50%'
  }

  const icons_inner = {
    display:'flex', flexDirection:'row', gap:'1rem'
  }
    
  return (
    <>
    {/* Profile */}
      <>
      <Container sx={container}>
        <Box sx={box}>
          <Typography sx={box} level="body-lg">{user.isAdmin ? "Admin roles" : 'No admin'}</Typography>

          <Typography level="body-lg">
            Name: {user.name}
          </Typography>

          <Typography sx={box} level="body-lg">
            Email: {user.email}
          </Typography>

          <Typography sx={box}level="body-lg">
            Username: {user.username}
          </Typography>

          <Typography  sx={box}level="body-lg">
            Description Header: <br/>{user.about}
            </Typography>
            
          {user.isAdmin === true ? (
            <>
            <Container sx={{display:'flex', gap:'1rem'}}>
              Projects
              <Box sx={icons_inner}>
                <Typography component="a" href="/new">
                  <Tooltip title="Add new post">
                    <AddIcon sx={box}/>
                  </Tooltip>
                </Typography>
                <Typography  component="a" href="/adminpanel">
                  <Tooltip title="Admin Panel - Posts">
                    <AdminPanelSettingsIcon sx={box}/>
                  </Tooltip>
                </Typography> 
              </Box>
            </Container>

            <Container sx={{display:'flex', gap:'1rem'}}>
              My Blog
              <Box sx={icons_inner}>
                <Typography component="a" href="/new-note">
                  <Tooltip title="Add new note">
                    <CreateIcon sx={box}/>
                  </Tooltip>
                </Typography>
                <Typography  component="a" href="/adminpanel-notes">
                  <Tooltip title="Admin Panel - Notes">
                    <AdminPanelSettingsIcon sx={box}/>
                  </Tooltip>
                </Typography> 
              </Box>
            </Container>

            <Container sx={{display:'flex', gap:'1rem'}}>
              Profile Management
              <Typography component="a" href="/user/update">
                <Tooltip title='Update'>
                  <ManageAccountsIcon sx={box}/>
                </Tooltip>
              </Typography>
            </Container>
          </>

          ) : (
            <Typography sx={box} level="body-lg">Admin: No Admin Privilege</Typography>
          )
            }
        </Box>
      

    
      </Container>
      </>      
    </>
  )
}
