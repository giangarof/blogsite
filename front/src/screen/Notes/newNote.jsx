import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { Box, TextField, Stack, Button, Grid } from "@mui/material";
import { Typography } from "@mui/joy";
import axios from 'axios';


import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../quill.css'

export default function NewNote() {
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [about, setAbout] = useState('')
    const [description, setDescription] = useState('')

    const [errorMsg, setErrorMsg] = useState('')

    const newNote = async(e) => {
        e.preventDefault()
        try {
            const data = {
                title, 
                about,
                description,
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

    const fontOptions = [
        { label: 'Sans Serif', value: 'sans-serif' },
        { label: 'Serif', value: 'serif' },
        { label: 'Monospace', value: 'monospace' },
      ];

    const toolbarOptions = [
        [{ 'font': fontOptions.map(option => option.value) }],
        [{ 'header': [1, 2, false] }], // Headers
        ['bold', 'italic', 'underline', 'strike'], // Text styles
        ['blockquote', 'code-block'], // Block formats
        [{ 'list': 'ordered' }, { 'list': 'bullet' }], // Lists
        [{ 'script': 'sub' }, { 'script': 'super' }], // Subscript/Superscript
        [{ 'indent': '-1' }, { 'indent': '+1' }], // Indent/Outdent
        [{ 'direction': 'rtl' }], // Text direction
        [{ 'color': [] }, { 'background': [] }], // Color dropdowns
        [{ 'align': [] }], // Text alignment
        ['clean'], // Clear formatting button
        ['link', 'image', 'video'], // Insert link/image/video
    ];

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

                        <TextField  id="outlined-basic" label="Note's title" variant="outlined" 
                                    value={title} 
                                    onChange={(e) => setTitle(e.target.value) }/>

                        <TextField  id="outlined-basic" label="Brief explanation about the note" variant="outlined" 
                            value={about} 
                            onChange={(e) => setAbout(e.target.value) }/>
                        
                        <ReactQuill 
                            className='content-preview'
                            value={description} 
                            onChange={setDescription} 
                            theme='snow'
                            modules={{ toolbar: toolbarOptions }}
                        />

                        <Button variant="contained" size="large"
                                onClick={newNote}>
                                    Submit
                        </Button>
            </Box>
        </Grid>
        </>
  )
}