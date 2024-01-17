import React, {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios';
import { Box, Card, CardContent, TextField, Stack, Button } from "@mui/material";
import { Typography } from "@mui/joy";

import DeletePost from "../components/DeletePost";


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
    
    // Fetch post
    const fetchPosts = async() =>{
        const res = await axios.get(`/api/post/${id}`)
        const updateData = res.data;
        setTitle(updateData.title)
        setDescription(updateData.description)
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

    // Upload file
    const FileUpload = (e) => {
        const file = e.target.files[0]
        setImage(file)
        console.log(file)
    }

    // Submit update logic
    const submitUpdate= async(id) => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("image", image);
        
        const data = axios.put(`/api/post/${id}`, formData)
            .then((response) => {
                const result = {
                    ok:response.data.message, 
                    data:response.data.savedPost,
                    
                }
                navigate(`/post/${id}`)
                // console.log(result)
                return result
                
            })
            .catch((error) => {
                throw new Error(error.response.data.error, {err: 'provide new details to update at least in one field'})
            })

            const result = await data;
            console.log(result);
    }

    useEffect(() => {
        fetchPosts()
    }, [id])


    return (
        <>
            <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    
                    <Box sx={{
                            width:'30%',
                            // marginTop:4, 
                            display:'grid', 
                            alignContent:'center', 
                            // gridTemplateColumns: 'repeat(2, 1fr)', 
                            gap:3, 
                            margin:'auto'
                    }}>

                            <Card 
                                key={post._id} 
                                spacing={3} 
                                sx={{marginTop:4}}
                            >
                                
                                <CardContent>

                                    <Typography variant="h5" color="error">Update Control</Typography>

                                    {/* <Typography variant="h5" color="text.secondary">{post.title}</Typography> */}
                                    <TextField  id="outlined-basic" variant="outlined" 
                                        value={title} 
                                        onChange={handleTitle}
                                        />

                                    <Typography variant="h5" color="error">Previous Image</Typography>
                                    {/* <p>{currentImage}</p> */}
                                    {Array.isArray(image) && image.length > 0 && (
                                    <img src={image[0].url} width={250} height={250} />     
                                    )}

                                    <Typography variant="h5" color="error">New Image</Typography>
                                    <input type='file' onChange={FileUpload} />   
                                    {/* {image[0].filename}     */}
                                    {/* {Array.isArray(image) && image.length > 0 && (
                                        // <img src={post.image[0].url} width={250} height={250} />     
                                    )} */}

                                    {/* <Typography variant="body1">{post.description}</Typography> */}
                                    <TextField  id="outlined-basic" variant="outlined" 
                                        value={description} 
                                        onChange={handleDescription}/>
                                </CardContent>
                                
                                <Button variant="contained" onClick={() => submitUpdate(postId)} >
                                    <Typography variant="h5">Update</Typography>
                                </Button>
                                    
                                
                            </Card>

                    </Box>
                </div>
            )}

        </div>
        
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