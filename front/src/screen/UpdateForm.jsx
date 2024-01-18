import React, {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios';
import { Box, Card, CardContent, TextField, Button, CardMedia} from "@mui/material";
import { Typography, Textarea } from "@mui/joy";

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
                            width:'100%',
                            display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'
                    }}>

                            <Card 
                                key={post._id} 
                                spacing={3} 
                                sx={{
                                    width:'50%',
                                    marginTop:4, marginBottom:4,
                                }}
                            >

                                    {Array.isArray(image) && image.length > 0 && (
                                        <CardMedia
                                            component='img'
                                            image={image[0].url}
                                        />
                                        )}

                                <CardContent 
                                    sx={{
                                        display:'flex', flexDirection:'column', alignContent:'center',
                                        backgroundColor:'rgb(0, 0, 0, 0.12)',
                                    }}>

                                    <Typography>New Image</Typography>
                                    <input type='file' onChange={FileUpload} />

                                    <Typography sx={{marginTop:4}} variant="h5" color="error">Update Control</Typography>
                                    <TextField  id="outlined-basic" variant="outlined" 
                                        value={title} 
                                        onChange={handleTitle}
                                        sx={{marginBottom:4, backgroundColor:'#fff'}}
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

                                    <Typography>Description</Typography>
                                    <Textarea 
                                        value={description}
                                        onChange={handleDescription}/>

                                    <Button 
                                        sx={{marginTop:4}}
                                        variant="contained"
                                        size='small' 
                                        onClick={() => submitUpdate(postId)} 
                                    >
                                        <Typography sx={{color:'white'}}>Update</Typography>
                                    </Button>

                                </CardContent>

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