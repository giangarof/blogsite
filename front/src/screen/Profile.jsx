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
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [isAdmin, setIsAdmin] = useState(Boolean)
  const [about, setAbout] = useState('')

  
  const fetchUser = async() => {
    const res = await axios.get(`/api/user/profile/${id}`);
    console.log(res)
    setName(res.data.user.name);
    setUsername(res.data.user.username);
    setEmail(res.data.user.email);
    setAbout(res.data.user.about);
    setIsAdmin(res.data.user.isAdmin)
    // console.log(res)
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
    display:'flex', flexDirection:'column', gap:'1rem'
  }
    
  return (
    <>
    {/* Profile */}
      <>
      <Container sx={container}>
        <Box sx={box}>
          <Typography level="body-lg">
            Name: {name}
          </Typography>

          <Typography sx={box} level="body-lg">
            Email: {email}
          </Typography>

          <Typography sx={box}level="body-lg">
            Username: {username}
          </Typography>

          <Typography  sx={box}level="body-lg">
            Description Header: <br/>{about}
            </Typography>
            
          {isAdmin === true ? (
            <>
            <Typography sx={box} level="body-lg">Admin: {isAdmin ? "Admin roles" : 'No admin'}</Typography>
            <Stack display="flex" flexDirection="row" gap={4}>

              {/* Posts */}
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

              {/* Notes */}
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




              <Typography component="a" href="/user/update">
                <Tooltip title='Update'>
                  <ManageAccountsIcon sx={box}/>
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
        </Box>
      

    
      </Container>
      </>      
    </>
  )
}
