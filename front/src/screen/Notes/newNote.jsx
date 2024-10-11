import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { Box, TextField, Stack, Button, Grid } from "@mui/material";
import { Typography, Textarea } from "@mui/joy";

import axios from 'axios';

export default function NewNote() {
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const [errorMsg, setErrorMsg] = useState('')

    const newNote = async(e) => {
        e.preventDefault()
        try {
            const data = {
                title, 
                description
            }
            
            const note = await axios.post('/api/note/new', data)
            navigate('/now')
            // console.log(post)
            // return post
            
            
        } catch (err) {
            console.error(typeof(err.response.data.error))
            setErrorMsg(err.response.data.error)
        }
    }

    return (
        <>
        <Grid container justifyContent="center" >
            <Box 
                    sx={{
                        mt:10,
                        width:{
                        xs:'90%',
                        lg: '50%'
                        }
                    }} 
                    display="flex"
                    flexDirection="column"
                    gap={3}
                    
                >   
                        <Typography level="h3">New Note</Typography>

                        <TextField  id="outlined-basic" label="Title" variant="outlined" 
                                    value={title} 
                                    onChange={(e) => setTitle(e.target.value) }/>
                        <TextField  id="outlined-basic" label="Repository" variant="outlined" 
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value) }/>

                        <Button variant="contained" size="large"
                                onClick={newNote}>
                                    Submit
                        </Button>
            </Box>
        </Grid>
        </>
  )
}