import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'

import { Box, TextField, Stack, Button } from "@mui/material";
import { Typography } from "@mui/joy";
import axios from 'axios';

import Message from "../components/Message.jsx";

export default function Signin() {
  const navigate = useNavigate()

  const [password, setPswd] = useState('')
  const [email, setEmail] = useState('')
  
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
          // location.reload()
        })
        .catch((error) => {
          console.log({'Login Failed': error})
        })
  }

      useEffect(() => {
        

      },[])
  
        return(
            <>
              <Box sx={{
                mt: 10,
                width:'100%',
                display:'flex', 
                flexDirection:'column', 
                justifyContent:'center', 
                alignItems:'center',
                }}>
                <Stack 
                  sx={{
                    display:'flex', flexDirection:'column', alignItems:'center',
                    maxWidth:'100%',
                    minWidth: '40%',
                    backgroundColor:'white',
                    boxShadow:'0 0 20px 0',
                    // backgroundColor:'rgb(0, 0, 0, 0.12)',
                    gap:3
                  }}
                >
                    <Typography level="h3" sx={{marginTop:4}}>Credentials</Typography>

                    {/* <TextField id="outlined-basic" label="Full Name" variant="outlined" /> */}
                    <TextField 
                      id="outlined-basic" 
                      label="Email" 
                      variant="outlined" 
                      value={email} onChange={(e) => setEmail(e.target.value) }
                      sx={{backgroundColor:'#fff'}}
                      />
                    {/* <TextField id="outlined-basic" label="Email" variant="outlined" /> */}
                    <TextField 
                        id="outlined-basic" 
                        label="Password" 
                        variant="outlined" 
                        value={password} onChange={(e) => setPswd(e.target.value)} 
                        sx={{backgroundColor:'#fff'}}
                    />

                    <Button 
                      variant="contained" 
                      
                      sx={{marginBottom:4}} 
                      onClick={loginUser}>Sign In</Button>
                    
                </Stack>

                <Message/>

              </Box>
            </>
        )
}