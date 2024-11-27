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
    
    const [post, setPost] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    // const [imageNew, setImageNew] = useState('')
    const [postId, setPostId] = useState('')
    const [repo, setRepo] = useState('')
    const [link, setLink] = useState('')
    const [tech, setTech] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    
    // Fetch post
    const fetchPosts = async() =>{
        const res = await axios.get(`/api/post/${id}`)
        const updateData = res.data;
        setTitle(updateData.title)
        setDescription(updateData.description)
        setRepo(updateData.repo)
        setLink(updateData.link)
        setTech(updateData.tech)
        // Display Image
        setImage(updateData.image)
        setPostId(updateData._id)
        
        // console.log(res, res.data.image[0].url)
        // console.log(image)
        return updateData
        // try {
            
        // } catch (err) {
        //     if(err.res){
        //         console.error('Response data:', err.res.data);
        //         console.error('Response status:', err.res.status);
        //         console.error('Response headers:', err.res.headers);
        //     }
        //     console.log('something went wrong: ', err.message)
        // }
    }

    // Handle change events
    const handleTitle = (e) => {
        setTitle(e.target.value)
    }
    const handleDescription = (e) => {
        setDescription(e.target.value)
    }

    const handleRepo = (e) => {
        setRepo(e.target.value)
    }

    const handleLink = (e) => {
        setLink(e.target.value)
    }

    const handleTech = (e) => {
        setTech(e.target.value)
    }

    // Upload file
    const FileUpload = (e) => {
        const file = e.target.files[0]
        setImage(file)
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
            formData.append("title", title);
            formData.append("description", description);
            formData.append("image", image);
            formData.append("repo", repo);
            formData.append("link", link);
            formData.append("tech", tech);
            
            const data = await axios.put(`/api/post/${id}`, formData)
            console.log(data)
            navigate(`/post/${id}`)
        } catch (error) {
            console.error(error.response.data.error)
            setErrorMsg(error.response.data.error)
        } finally{
            setIsLoading(false)
        }
            // .then((response) => {
            //     const result = {
            //         ok:response.data.message, 
            //         data:response.data.savedPost,
            //     }
            //     navigate(`/post/${id}`)
            //     // console.log(result)
            //     return result
            // })
            // .catch((error) => {
            //     // throw new Error(error.response.data.error, {err: 'provide new details to update at least in one field'})
            //     console.error(error.response.data.error)
            //     setErrorMsg(error.response.data.error)
            // })

            // const result = await data;
            // console.log(result);
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

                    {Array.isArray(image) && image.length > 0 && (
                        <CardMedia
                            component='img'
                            image={image[0].url}
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
                            <input type='file' onChange={FileUpload} />

                            <Typography sx={{marginTop:4}} variant="h5" color="error">Title</Typography>
                            <Textarea  id="outlined-basic" variant="outlined" 
                                value={title} 
                                onChange={handleTitle}
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
                                value={repo}
                                onChange={handleRepo}/>

                            <Typography>Full Project</Typography>
                            <Textarea 
                                value={link}
                                onChange={handleLink}/>

                            <Typography>Description</Typography>
                            <Textarea 
                                value={description}
                                onChange={handleDescription}/>

                            <Typography>Technologies</Typography>
                            <Textarea 
                                value={tech}
                                onChange={handleTech}/>

                            {errorMsg ? (
                                <Typography level="body-lg" textColor='red'>{errorMsg}</Typography>
                            ) : ''}

                            <Button 
                                sx={{marginTop:2}}
                                variant="contained" size='small' 
                                onClick={() => submitUpdate(postId)} 
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