//React
import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'

// MUI
import { Box, TextField, Stack, Button, Typography, } from "@mui/material";
import { Container } from '@mui/system';

//Others
import axios from 'axios';

// Components
import Message from "../../components/Message.jsx";

export default function Signin() {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email:'',
    password:''
  })

  const [errorMsg, setErrorMsg] = useState('')

  const login = async(e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/user/signin', user)
      const message  = response.data.message;
      const profile = {
        id: response.data._id,
        name: response.data.userProfile.name
      }
      localStorage.setItem('profile', JSON.stringify(profile))
      sessionStorage.setItem('notification', message)
      navigate(`/`)
      location.reload()
      
    } catch (error) {
      setErrorMsg(error.response.data.message)
    }
  }

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  useEffect(() => {
        

  },[])
  
        return(
            <>
              <Box sx={{
                width: {
                  sm:'100%',
                  md:'100%'
                },
                display:'flex', 
                flexDirection:'row', 
                justifyContent:'center', 
                margin: 'auto auto 15px auto'
                // gap:8
                }}>
                <Container 
                  sx={{
                    width:{
                      sm:'100%',
                      md:'40%'
                    },
                    display:'flex', 
                    flexDirection:'column', 
                    alignItems:'center',
                    gap:5,
                  }}
                >
                    <Typography level="h3" sx={{marginTop:4}}>Credentials</Typography>

                    {/* <TextField id="outlined-basic" label="Full Name" variant="outlined" /> */}
                    <TextField
                      fullWidth
                      multiline
                      id="outlined-basic" 
                      label="Email" 
                      maxRows={4}
                      variant="filled"
                      value={user.email} name="email"
                      onChange={handleChange}
                      sx={{backgroundColor:'#fff'}}
                      />
                    {/* <TextField id="outlined-basic" label="Email" variant="outlined" /> */}
                    <TextField 
                        fullWidth
                        maxRows={4}
                        variant="filled"
                        id="outlined-basic"
                        type="password"
                        label="Password" 
                        value={user.password} name="password"
                        onChange={handleChange}
                        sx={{backgroundColor:'#fff'}}
                    />

                    <Button 
                      variant="contained" 
                      fullWidth
                      // sx={{marginBottom:4}} 
                      onClick={login}>Sign In</Button>
                    
                  <Typography 
                    sx={{
                      color:'red',
                      
                    }}>{errorMsg}</Typography>
                </Container>

                <Message/>

              </Box>
            </>
        )
}