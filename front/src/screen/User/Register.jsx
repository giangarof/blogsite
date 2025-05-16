import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'
import { Box, TextField, Stack, Button } from "@mui/material";
import { Typography } from "@mui/joy";
import axios from 'axios';


export default function Register() {
  const navigate = useNavigate()
  const [name, setFullname] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')

  const [password, setPswd] = useState('')
  const [confirmPswd, setConfirmPswd] = useState('')

  const register = async () => {
    try {
      const credentials = {name, username, email, password}
      const newUser = await axios.post('/api/user/signup', credentials)
      // console.log(newUser)
      navigate(`/signin`)
      return newUser
      
    } catch (error) {
      console.log(error.response.data)
    }
  }

  // useEffect(() => {
  //   register()
  // }, [])

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
                    <Typography level="h3" sx={{marginTop:4}}>New user information</Typography>

                    <TextField  id="outlined-basic" label="Full Name" variant="outlined" 
                                value={name}
                                sx={{backgroundColor:'#fff'}} 
                                onChange={(e) => setFullname(e.target.value) }/>
                    <TextField  id="outlined-basic" label="Username" variant="outlined" 
                                value={username}
                                sx={{backgroundColor:'#fff'}}
                                onChange={(e) => setUsername(e.target.value) }/>
                    <TextField  id="outlined-basic" label="Email" variant="outlined"
                                sx={{backgroundColor:'#fff'}} 
                                value={email} onChange={(e) => setEmail(e.target.value) }/>

                    <TextField  id="outlined-basic" label="Password" variant="outlined"
                                sx={{backgroundColor:'#fff'}} 
                                value={password} onChange={(e) => setPswd(e.target.value) }/>

                    <TextField  id="outlined-basic" label="Confirm Password" variant="outlined"
                                sx={{backgroundColor:'#fff',}} 
                                value={confirmPswd} onChange={(e) => setConfirmPswd(e.target.value) }/>

                    <Button 
                      variant="contained"
                      sx={{
                        marginBottom:4
                      }}
                      onClick={register}>
                      Complete registration
                    </Button>
                </Stack>

              </Box>
            </>
        )
}