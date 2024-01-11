import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'

import { Box, TextField, Stack, Button } from "@mui/material";
import { Typography } from "@mui/joy";
import axios from 'axios';

export default function Signin() {
  const navigate = useNavigate()

  const [password, setPswd] = useState('')
  const [email, setEmail] = useState('')
  const [profile, setProfile] = useState('')
  
  const loginUser = async () => {
    const credentials = {email, password}
    const loginUser = await axios.post('/api/user/signin', credentials)
      .then((response) => {
        const result = {
            message:response.data.message, 
            data:response.data,
          }
          console.log(result)
        })
        .catch((error) => {
          console.log({'Login Failed': error})
        })
        // setProfile(result.message)
      navigate(`/home`)
  }
  
        return(
            <>
              <Box sx={{mt: 10}}>
                <Stack direction="column" justifyContent="center" alignItems="center" spacing={4}>
                    <Typography level="h3">Credentials</Typography>

                    {/* <TextField id="outlined-basic" label="Full Name" variant="outlined" /> */}
                    <TextField id="outlined-basic" label="Email" variant="outlined" 
                      value={email} onChange={(e) => setEmail(e.target.value) }/>
                    {/* <TextField id="outlined-basic" label="Email" variant="outlined" /> */}
                    <TextField id="outlined-basic" label="Password" variant="outlined" 
                      value={password} onChange={(e) => setPswd(e.target.value) }/>

                    <Button variant="contained" size="large" onClick={loginUser}>Sign In</Button>
                    {/* {{profile}} */}
                </Stack>

              </Box>
            </>
        )
}