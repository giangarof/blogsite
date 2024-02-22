import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import { Box, Card, Button, CardContent, CardMedia, Link as A } from "@mui/material";
import Typography from '@mui/joy/Typography';

import axios from "axios"

export default function () {
    const [post, setPost] = useState([])
    const [img, setImg] = useState()
    const [isLoading, setIsLoading] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false)
    const {id} = useParams()
    const navigate = useNavigate()

    const fetchPosts = async() =>{
        try {
            const data = await axios.get(`/api/post/${id}`)
            const res = data
            // console.log(res.data.image[0].url)
            setPost(res.data)
            setImg(res.data.image[0].url)
            return res.data
            
        } catch (err) {
            console.log('something went wrong: ', err.message)
        }
    }

    const updatePostScreen = async(id) => {
        navigate(`/post/update/${id}`)
    }

    const goBack = async() => {
        navigate(`/`)
    }
    
    useEffect(() => {
          const isAdmin = JSON.parse(localStorage.getItem('isAdmin'))
          setIsAdmin(isAdmin)
          fetchPosts()
      }, [id])
  return (

        <>
            <div>
                {isLoading ? (
                <p>Loading...</p>
                ) : (
                    <div>
                        {/* Render or use 'post' */}
                        <Box sx={{
                                // width:'100%',
                                // height:'100%',
                                display:'flex', flexDirection:'row', justifyContent:'center',
                                width:{
                                    sm: '100%',
                                    md: '100%'
                                }
                        }}>

                                <Card 
                                    key={post._id} 
                                    sx={{
                                        width:{
                                            sm: '90%',
                                            md: '60%'
                                        },
                                        margin: '2rem 0 2rem 0',
                                        boxShadow:'0px 0px 20px 0px'

                                    }}
                                >
                                    <CardMedia
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center', /* Horizontally center the content */
                                            alignItems: 'center', /* Vertically center the content */
                                            height: '50vh',
                                            objectFit:'contain'
                                        }}
                                        component="img"
                                        image={img}
                                    />
                                    <CardContent
                                        sx={{
                                            display:'flex', flexDirection:'column', gap:2,
                                            backgroundColor:'rgb(0, 0, 0, 0.12)',
                                            }}
                                        >
                                        {/* {Array.isArray(post.image) && post.image.length > 0 && (
                                            <img src={post.image[0].url} width={250} height={250} />     
                                            )} */}
                                        <Typography level="h2" color="text.secondary">{post.title}</Typography>
                                        <Typography level="body-md">{post.description}</Typography>
                                        <A style={{width:'100px'}} sx={{display:'inline-block', cursor:'pointer'}} href={post.repo} target="_blank" >Github Code</A>
                                        <A style={{width:'100px'}} sx={{cursor:'pointer'}} href={post.link} target="_blank">Full Project</A>
                                        <Typography level="title-sm" color="text.secondary">Technologies used: {post.tech}</Typography>
                                        
                                        {isAdmin == true ? 
                                        <>
                                            <Button 
                                                variant="contained" 
                                                size='small' 
                                                onClick={() => updatePostScreen(post._id)}
                                                sx={{marginTop:"10px"}}
                                            >
                                                <Typography 
                                                    // variant="h5" 
                                                    size="small"
                                                    color='white'
                                                >
                                                Options
                                            </Typography>
                                            </Button>
                                            <Button 
                                                variant="contained" 
                                                size='small' 
                                                onClick={goBack}
                                                sx={{marginTop:"10px"}}
                                            >
                                                <Typography 
                                                    // variant="h5" 
                                                    size="small"
                                                    color='white'
                                                >
                                                Go Back
                                            </Typography>
                                            </Button>
                                        </>
                                         : "" }
                                    </CardContent>
                                </Card>
                        </Box>
                    </div>
            )}
            </div>
        </>

  )
}
