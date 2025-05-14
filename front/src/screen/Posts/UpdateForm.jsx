import React, {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios';
import { Box, Card, CardContent, TextField, Button, CardMedia, Grid} from "@mui/material";
import { Typography, Textarea } from "@mui/joy";

import DeletePost from "../../components/DeleteNote";
import CircularIndeterminate from '../../components/Spinner';


export default function UpdateForm() {
    const navigate = useNavigate()
    const {id} = useParams()
    const [isLoading, setIsLoading] = useState(null)

    const [post, setPost] = useState({
        id:'',
        title:'',
        description:'',
        image:'',
        repo:'',
        link:'',
        tech:'',

    })
    const [errorMsg, setErrorMsg] = useState('')
    
    
    // Fetch post
    const fetchPosts = async() =>{
        const res = await axios.get(`/api/post/${id}`)
        const data = res.data;
        setPost({
            id:data._id,
            title:data.title,
            description:data.description,
            image:data.image,
            repo:data.repo,
            link:data.link,
            tech:data.tech,
        })
    }


    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
      };

    // Upload file
    const FileUpload = (e) => {
        const file = e.target.files[0]
        setPost({ ...post, image: file });
        console.log(file)
    }

    const admin = async() => {
        navigate(`/adminpanel`)
    }

    // Submit update logic
    const submitUpdate= async(id) => {
        setIsLoading(true)
        try {
            const formData = new FormData();
            formData.append("title", post.title);
            formData.append("description", post.description);
            formData.append("image", post.image);
            formData.append("repo", post.repo);
            formData.append("link", post.link);
            formData.append("tech", post.tech);
            
            const response = await axios.put(`/api/post/${id}`, formData)
            sessionStorage.setItem('notification', response.data?.message)
            navigate(`/post/${id}`)
        } catch (error) {
            console.error(error)
            // setErrorMsg(error.response.data.error)
        } finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [id])


    return (
        <>
        <Grid container justifyContent="center" >
            <Box 
                sx={{
                    mt:3,
                    mb:3,
                    width:{ xs:'90%', lg: '50%'}
                }}>

                <Card key={post._id} spacing={3} >

                    {Array.isArray(post.image) && post.image.length > 0 && (
                        <CardMedia
                            component='img'
                            image={post.image[0].url}
                            sx={{  
                                display: 'flex',
                                justifyContent: 'center', /* Horizontally center the content */
                                alignItems: 'center', /* Vertically center the content */
                                height: '40vh',
                                objectFit:'contain'
                            }}/>
                        )}

                    <CardContent 
                        sx={{
                            display:'flex', 
                            flexDirection:'column', 
                            alignContent:'center',
                            backgroundColor:'rgb(0, 0, 0, 0.12)',
                        }}>

                            <Typography>New Image</Typography>
                            <input type='file' name='image' onChange={FileUpload} />

                            <Typography sx={{marginTop:4}} variant="h5" color="error">Title</Typography>
                            <Textarea  id="outlined-basic" variant="outlined" 
                                value={post.title} name='title'
                                onChange={handleChange}
                                // sx={{backgroundColor:'#fff'}}
                            />

                            {/* <Typography>Previous Image</Typography>
                            {Array.isArray(image) && image.length > 0 && (
                                <CardMedia
                                    component='img'
                                    image={image[0].url}
                                    sx={{marginBottom:4}}/>
                                        )}

                                        <Typography>New Image</Typography>
                                        <input type='file' onChange={FileUpload} />    */}

                            <Typography>Github</Typography>
                            <Textarea 
                                value={post.repo} name='repo'
                                onChange={handleChange}/>

                            <Typography>Full Project</Typography>
                            <Textarea 
                                value={post.link} name='link'
                                onChange={handleChange}/>

                            <Typography>Description</Typography>
                            <Textarea 
                                value={post.description} name='description'
                                onChange={handleChange}/>

                            <Typography>Technologies</Typography>
                            <Textarea 
                                value={post.tech} name='tech'
                                onChange={handleChange}/>

                            {errorMsg ? (
                                <Typography level="body-lg" textColor='red'>{errorMsg}</Typography>
                            ) : ''}

                            <Button 
                                sx={{marginTop:2}}
                                variant="contained" size='small' 
                                onClick={() => submitUpdate(post.id)} 
                            >
                                {isLoading ? <CircularIndeterminate /> : <Typography sx={{color:'white'}}>Update Changes</Typography>}
                                {/* <Typography sx={{color:'white'}}>Update Changes</Typography> */}
                            </Button>
                            
                            <Button 
                                variant="contained" 
                                size='small' 
                                onClick={admin}
                                sx={{marginTop:"10px"}}
                            >
                                <Typography 
                                    // variant="h5" 
                                    size="small"
                                    color='white'
                                >
                                Admin Panel
                            </Typography>
                            </Button>

                    </CardContent>

                </Card>
            </Box>
        </Grid> 
        
        </>
  )
}

const style = {
    btn: {
        cursor: 'not-allowed',
        color:'red',
        margin: '10px',
        backgroundColor: 'red'
        
    }
}