import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { Box, TextField, Stack, Button } from "@mui/material";
import { Typography } from "@mui/joy";

import axios from 'axios';

export default function NewPost() {
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')

    const FileUpload = (e) => {
        const file = e.target.files[0]
        setImage(file)
        console.log(file)
    }

    const newPost = async(e) => {
        e.preventDefault()
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("image", image);

            const post = await axios.post('/api/post/new', formData)
            navigate('/home')
            console.log(post)
            // return post
            
            
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <Box sx={{mt:10}}>
                <Stack direction="column" justifyContent="center" alignItems="center" spacing={4} 
                >
                        <Typography level="h3">New Post</Typography>

                        <TextField  id="outlined-basic" label="Title" variant="outlined" 
                                    value={title} 
                                    onChange={(e) => setTitle(e.target.value) }/>
                        <TextField  id="outlined-basic" label="Description" variant="outlined" 
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value) }/>

                        {/* enable file upload */}

                        <input type='File' onChange={FileUpload}/>
                        {/* <Button  id="outlined-basic" label="Image" variant="outlined" 
                                    value={image} onChange={(e) => setImage(e.target.value) } >
                                        Upload Image
                        </Button> */}

                        <Button variant="contained" size="large"
                                onClick={newPost}>
                                    Submit
                        </Button>
                </Stack>
            </Box>
        </>
  )
}