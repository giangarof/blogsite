//react
import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'

//mui
import { Box, TextField, Stack, Button, Grid, Container } from "@mui/material";
import { Typography, Textarea } from "@mui/joy";

//components
import CircularIndeterminate from '../../components/Spinner';

//dependencies
import axios from 'axios';

export default function NewPost() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [repo, setRepo] = useState('')
    const [link, setLink] = useState('')
    const [tech, setTech] = useState('')

    const [errorMsg, setErrorMsg] = useState('')
    const [forbidden, setForbidden] = useState(null)

    const FileUpload = (e) => {
        const file = e.target.files[0]
        setImage(file)
        // console.log(file)
    }

    const verify = async() =>{
        try {
            const user = await axios.get('/api/user/loggedIn')
            console.log(user)
            setForbidden(false)
        } catch (error) {
            console.log(error.response.data.message)
            setForbidden(true)
        }
    }

    const newPost = async(e) => {
        e.preventDefault()
        setIsLoading(true) //starts to load
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("image", image);
            formData.append("repo", repo)
            formData.append("link", link)
            formData.append("tech", tech)

            const post = await axios.post('/api/post/new', formData)
            setIsLoading(true)
            navigate('/')
            console.log(post)
            // return post
            
            
        } catch (err) {
            // console.error(typeof(err.response.data.error))
            setErrorMsg(err.response.data.error)
            setErrorMsg(err.response.data.message)
        } finally {
            setIsLoading(false) //stop loading
        }
    }

    
    useEffect(() => {
        verify()
    }, [])
    
    return (
        <>
        {forbidden ? <>
            <Container sx={{mt:3}}>
                <h3>Not allowed to be here. Please, go back.</h3>
            </Container>
        </> : <>
        
            <Grid container justifyContent="center">
                
                    <Box 
                            sx={{
                                mt:3,
                                mb:3,
                                width:{
                                xs:'90%',
                                lg: '50%'
                                }
                            }} 
                            display="flex"
                            flexDirection="column"
                            gap={2}
                            
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
                                            xs={{width:'90%'}}
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value) }/>

                                <input type='File' onChange={FileUpload}/>

                                {errorMsg ? (
                                    <Typography level="body-lg" textColor='red'>{errorMsg}</Typography>
                                    ) : ''}

                                <Button variant="contained" size="large" sx={{height:'50px',}}
                                        onClick={newPost}>
                                            {isLoading ? <CircularIndeterminate/> : "Submit"}
                                </Button>

                                
                    </Box>
                
            </Grid>
        
        </>}
        </>
  )
}