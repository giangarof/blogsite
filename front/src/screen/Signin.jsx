import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'

import { Box, TextField, Stack, Button, Typography, } from "@mui/material";
import { Container } from '@mui/system';
// import { Typography } from "@mui/joy";
import axios from 'axios';

import Message from "../components/Message.jsx";

export default function Signin() {
  const navigate = useNavigate()

  const [password, setPswd] = useState('')
  const [email, setEmail] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const loginUser = async () => {

  const credentials = {email, password}
  const login = await axios.post('/api/user/signin', credentials)
      .then((response) => {
        const result = {
            message:response.data.message, 
            data:response.data,
            id:response.data._id
          }
          // console.log(result);

          localStorage.setItem("name", result.data.userProfile.name)
          localStorage.setItem("userId", result.data.userProfile._id)
          localStorage.setItem("isAdmin", result.data.userProfile.isAdmin)
          
          navigate(`/profile/${result.id}`)
          location.reload()
        })
        .catch((error) => {
          console.log({'Login Failed': error.response.data.message})
          setErrorMsg(error.response.data.message)
        })
  }

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
                      value={email} onChange={(e) => setEmail(e.target.value) }
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
                        value={password} onChange={(e) => setPswd(e.target.value)} 
                        sx={{backgroundColor:'#fff'}}
                    />

                    <Button 
                      variant="contained" 
                      fullWidth
                      // sx={{marginBottom:4}} 
                      onClick={loginUser}>Sign In</Button>
                    
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