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
    const [post ,setPost] = useState({
        title:'',
        description:'',
        image:'',
        repo:'',
        link:'',
        tech:'',
    })

    const [errorMsg, setErrorMsg] = useState('')
    const [forbidden, setForbidden] = useState(null)

    const FileUpload = (e) => {
        const file = e.target.files[0]
        setPost({ ...post, image: file });
        // console.log(file)
    }

    const verify = async() =>{
        try {
            const user = await axios.get('/api/user/loggedIn')
            // console.log(user)
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
            formData.append("title", post.title);
            formData.append("description", post.description);
            formData.append("image", post.image);
            formData.append("repo", post.repo)
            formData.append("link", post.link)
            formData.append("tech", post.tech)

            const created = await axios.post('/api/post/new', formData)
            sessionStorage.setItem('notification',created.data.message)
            navigate('/projects')
            // return post
            
            
        } catch (err) {
            console.error(err)
            // setErrorMsg(err.response?.data?.error)
            // setErrorMsg(err.response?.data?.message)
        } finally {
            setIsLoading(false) //stop loading
        }
    }

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
      };

    
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
                                            value={post.title} name='title' 
                                            onChange={handleChange}/>
                                <TextField  id="outlined-basic" label="Repository" variant="outlined" 
                                            value={post.repo} name='repo'
                                            onChange={handleChange}/>
                                <TextField  id="outlined-basic" label="Link" variant="outlined" 
                                            value={post.link} name='link'
                                            onChange={handleChange}/>
                                <TextField  id="outlined-basic" label="Technologies" variant="outlined" 
                                            value={post.tech} name='tech' 
                                            onChange={handleChange}/>
                                <Textarea  id="outlined-basic" placeholder="Description" variant="outlined"
                                            minRows={5}  
                                            xs={{width:'90%'}}
                                            value={post.description} name='description'
                                            onChange={handleChange}/>

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