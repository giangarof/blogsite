import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { Box, TextField, Stack, Button } from "@mui/material";
import { Typography, Textarea } from "@mui/joy";

import axios from 'axios';

export default function NewPost() {
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [repo, setRepo] = useState('')
    const [link, setLink] = useState('')
    const [tech, setTech] = useState('')

    const [errorMsg, setErrorMsg] = useState('')

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
            formData.append("repo", repo)
            formData.append("link", link)
            formData.append("tech", tech)

            const post = await axios.post('/api/post/new', formData)
            navigate('/')
            // console.log(post)
            // return post
            
            
        } catch (err) {
            console.error(typeof(err.response.data.error))
            setErrorMsg(err.response.data.error)
        }
    }

    return (
        <>
            <Box sx={{mt:10, width:'100%'}}>
                <Stack 
                    sx={{width:'100%'}} 
                    direction="column" 
                    justifyContent="center" 
                    alignItems="center" 
                    spacing={4} 
                >
                        <Typography level="h3">New Post</Typography>

                        <TextField  id="outlined-basic" label="Title" variant="outlined" 
                                    value={title} 
                                    onChange={(e) => setTitle(e.target.value) }/>
                        <TextField  id="outlined-basic" label="Repository" variant="outlined" 
                                    value={repo}
                                    onChange={(e) => setRepo(e.target.value) }/>
                        <TextField  id="outlined-basic" label="Link" variant="outlined" 
                                    value={link}
                                    onChange={(e) => setLink(e.target.value) }/>
                        <TextField  id="outlined-basic" label="Technologies" variant="outlined" 
                                    value={tech} 
                                    onChange={(e) => setTech(e.target.value) }/>
                        <Textarea  id="outlined-basic" placeholder="Description" variant="outlined"
                                    minRows={5}  
                                    sx={{width:'20%'}}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value) }/>

                        {/* enable file upload */}
                        <input type='File' onChange={FileUpload}/>
                        {/* <Button  id="outlined-basic" label="Image" variant="outlined" 
                                    value={image} onChange={(e) => setImage(e.target.value) } >
                                        Upload Image
                        </Button> */}

                        {errorMsg ? (
                            <Typography level="body-lg" textColor='red'>{errorMsg}</Typography>
                            ) : ''}

                        <Button variant="contained" size="large"
                                onClick={newPost}>
                                    Submit
                        </Button>
                </Stack>
            </Box>
        </>
  )
}