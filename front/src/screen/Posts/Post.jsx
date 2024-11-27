//react
import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"

//mui
import { Box, Card, Button, CardContent, CardMedia, Typography, Tooltip, Snackbar, Link as A, SnackbarContent, Container } from "@mui/material";

//dependencies
import axios from "axios"

//components
import CopyLink from '../../components/CopyLink';
import CircularIndeterminate from '../../components/Spinner';
import Meta from '../../components/Meta';

export default function () {
    const [post, setPost] = useState([])
    const [img, setImg] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const {id} = useParams()
    const navigate = useNavigate()

    // const [open, setOpen]= useState(false)

    const fetchPosts = async() =>{
        setIsLoading(true)
        try {
            const data = await axios.get(`/api/post/${id}`)
            const res = data
            // console.log(res.data.image[0].url)
            setPost(res.data)
            setImg(res.data.image[0].url)
            return res.data
            
        } catch (err) {
            console.log('something went wrong: ', err.message)
        } finally{
            setIsLoading(false)
        }
    }

    const updatePostScreen = async(id) => {
        navigate(`/post/update/${id}`)
    }

    const goBack = async() => {
        navigate(`/projects`)
    }
    
    useEffect(() => {
          const isAdmin = JSON.parse(localStorage.getItem('isAdmin'))
          setIsAdmin(isAdmin)
          fetchPosts()
      }, [id])

  return (

        <>
            <Container sx={{mt:3}}>
                <Button variant='outlined' onClick={goBack}>Go Back</Button>
                {isLoading ? (
                    <>
                        <CircularIndeterminate size={90} />
                        <Typography sx={{textAlign:'center'}}>Loading... Please wait</Typography>
                    </>
                ) : (
                    <div>
                        <Meta title={post.title} description={post.description} image={img}/>
                        {/* Render or use 'post' */}
                        <Box sx={{
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
                                        <Typography variant="h5" >{post.title}</Typography>
                                        <Typography variant='p'>{post.description}</Typography>
                                        <A variant='p' style={{width:'100px'}} sx={{display:'inline-block', cursor:'pointer'}} href={post.repo} target="_blank" >Github Code</A>
                                        <A variant='p' style={{width:'100px'}} sx={{cursor:'pointer'}} href={post.link} target="_blank">Full Project</A>
                                        <Typography variant='p'>Technologies used: {post.tech}</Typography>
                                        
                                        {isAdmin == true ? 
                                            <Box sx={{display:'flex', gap:'1rem'}}>
                                                <Button variant="contained" onClick={() => updatePostScreen(post._id)}>
                                                    <Typography>Options</Typography>
                                                </Button>

                                                <CopyLink/>
                                            </Box>
                                         : <Box >
                                                <CopyLink/>
                                            </Box> }
                                    </CardContent>
                                </Card>
                        </Box>
                    </div>
            )}
            </Container>
        </>

  )
}
