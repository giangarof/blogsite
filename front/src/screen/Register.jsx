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
      console.log(newUser)
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
              <Box sx={{mt: 10}}>
                <Stack direction="column" justifyContent="center" alignItems="center" spacing={4}>
                    <Typography level="h3">New user information</Typography>

                    <TextField  id="outlined-basic" label="Full Name" variant="outlined" 
                                value={name} 
                                onChange={(e) => setFullname(e.target.value) }/>
                    <TextField  id="outlined-basic" label="Username" variant="outlined" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value) }/>
                    <TextField  id="outlined-basic" label="Email" variant="outlined" 
                                value={email} onChange={(e) => setEmail(e.target.value) }/>

                    <TextField  id="outlined-basic" label="Password" variant="outlined" 
                                value={password} onChange={(e) => setPswd(e.target.value) }/>

                    <TextField  id="outlined-basic" label="Confirm Password" variant="outlined" 
                                value={confirmPswd} onChange={(e) => setConfirmPswd(e.target.value) }/>

                    <Button variant="contained" size="large"
                            onClick={register}>
                            Complete registration
                    </Button>
                </Stack>

              </Box>
            </>
        )
}