import React, {useEffect, useState} from "react";
import { Box, TextField, Stack, Button } from "@mui/material";
import { Typography } from "@mui/joy";
import axios from 'axios';


export default function Register() {
  const [fullname, setFullname] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')

  const [pswd, setPswd] = useState('')
  const [confirmPswd, setConfirmPswd] = useState('')

  const register = () => {
    const newUser = axios.post('/api/user/signup')
  }

        return(
            <>
              <Box sx={{mt: 10}}>
                <Stack direction="column" justifyContent="center" alignItems="center" spacing={4}>
                    <Typography level="h3">New user information</Typography>

                    <TextField  id="outlined-basic" label="Full Name" variant="outlined" 
                                value={fullname} 
                                onChange={(e) => setFullname(e.target.value) }/>
                    <TextField  id="outlined-basic" label="Username" variant="outlined" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value) }/>
                    <TextField  id="outlined-basic" label="Email" variant="outlined" 
                                value={email} onChange={(e) => setEmail(e.target.value) }/>

                    <TextField  id="outlined-basic" label="Password" variant="outlined" 
                                value={pswd} onChange={(e) => setPswd(e.target.value) }/>

                    <TextField  id="outlined-basic" label="Confirm Password" variant="outlined" 
                                value={confirmPswd} onChange={(e) => setConfirmPswd(e.target.value) }/>

                    <Button variant="contained" size="large">Complete registration</Button>
                </Stack>

              </Box>
            </>
        )
}