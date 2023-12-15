import React, {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { Box, Card, CardContent, TextField, Stack, Button } from "@mui/material";

import { Typography } from "@mui/joy";

import axios from 'axios';

export default function UpdateForm() {
    const navigate = useNavigate()
    const {id} = useParams()
    const [post, setPost] = useState([])
    const [isLoading, setIsLoading] = useState(null)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    
    const fetchPosts = async() =>{
        try {
            const data = await axios.get(`/api/post/${id}`)
            const res = data
            console.log(data)
            setPost(res.data)
            return res.data
            
        } catch (err) {
            console.log('something went wrong: ', err.message)
        }
    }

    const deletePost = async(id) => {
        try {
            const data = await axios.delete(`/api/post/${id}`)
            const res = data
            console.log(res.data)
            navigate('/home')
            return res.data
            
        } catch (err) {
            console.log('something went wrong: ', err.message)
        }
    }

    const FileUpload = (e) => {
        const file = e.target.files[0]
        setImage(file)
        console.log(file)
    }

    const updatePost= async(id) => {
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("image", image);

            const data = await axios.put(`/api/post/${id}`, formData)
            console.log(data)
            navigate('/home')
        } catch (error) {
            throw new error('Something went wrong... try again later.')
        }
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
                                        placeholder={post.title} 
                                        onChange={(e) => setTitle(e.target.value) }/>

                                    <Typography variant="h5" color="error">Previous Image</Typography>
                                    {Array.isArray(post.image) && post.image.length > 0 && (
                                        <img src={post.image[0].url} width={250} height={250} />     
                                    )}

                                    <Typography variant="h5" color="error">New Image</Typography>
                                    {Array.isArray(post.image) && post.image.length > 0 && (
                                        // <img src={post.image[0].url} width={250} height={250} />     
                                        <input type='File' src={post.image[0].url} onChange={FileUpload}/>       
                                    )}

                                    {/* <Typography variant="body1">{post.description}</Typography> */}
                                    <TextField  id="outlined-basic" variant="outlined" 
                                        placeholder={post.description} 
                                        onChange={(e) => setDescription(e.target.value) }/>
                                </CardContent>


                                <Button variant="contained" onClick={() => deletePost(post._id)}>
                                    <Typography variant="h5" color="error">Delete</Typography>
                                </Button>

                                <Button variant="contained" onClick={() => updatePost(post._id)}>
                                    <Typography variant="h5" color="">Update</Typography>
                                </Button>
                                
                            </Card>

                    </Box>
                </div>
            )}

        </div>
        
        </>
  )
}