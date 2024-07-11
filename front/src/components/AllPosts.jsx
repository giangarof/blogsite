import React, { useState, useEffect } from "react"
import axios from "axios"
import Header from "../components/Header.jsx";
import { Container } from '@mui/system';
import { Box, Card, Button, CardContent, CardMedia, Typography, Tooltip, Hidden } from "@mui/material";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
export default function AllPosts() {
    const [post, setPost] = useState([])
    // const [img, setImg] = useState('')
    // const [isLoading, setIsLoading] = useState(null)

    // first way
    const fetchPosts = async() =>{
        try {
            const data = await axios.get('/api/post')
            const res = data
            console.log(res.data)
            setPost(res.data)
            return res.data
            
        } catch (err) {
            console.log('something went wrong: ', err.message)
        }
      }
      
      useEffect(() => {
          fetchPosts()
      }, [])

    // second way
    
    // It Works... dont delete it or modify it, please..!
    // useEffect(() => {
    //     const fetchData = async() => {
    //         const {data} = await axios.get('/api/post')
    //         console.log(data)
    //     }
    //     fetchData()
    // }, [])

    return (
        <>
        <Container id="AllPosts">
            <Container
                sx={{
                    display: 'grid',
                    alignContent:'center', 
                    gridTemplateColumns: {
                        sm: 'repeat(1, 1fr)',  
                        md: 'repeat(2, 1fr)',  
                    },
                    gap: 4,
                    marginBottom:5
            }}>
                        
                    {post.slice().reverse().map((item) => (
                        <Card 
                            key={item._id} 
                            sx={{
                                marginTop:5, boxShadow:'0px 0px 10px 0px',
                                // display: 'flex',
                                // flexDirection: {xs: 'row', lg: 'column'}
                            }}
                        >
                                    
                        {Array.isArray(item.image) && item.image.length > 0 && (
                            <CardMedia 
                                component='img'
                                // style={{width:'100%', objectFit:'fill'}}
                                image={item.image[0].url}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center', /* Horizontally center the content */
                                    alignItems: 'center', /* Vertically center the content */
                                    height: '33vh',
                                    objectFit:'contain'
                                }}
                            />
                        )}

                        <CardContent 
                            sx={{
                                backgroundColor:'rgb(0, 0, 0, 0.12)',
                                display:'flex', 
                                flexDirection:"column", 
                                justifyContent:'center',                        
                            }}
                        >
                        <Container 
                            sx={{
                                display:'flex', 
                                flexDirection:"column", 
                                justifyContent:'center'
                            }}>
                            <Typography variant="h5">{item.title}</Typography>
                            <Typography 
                                variant="p" 
                                sx={{
                                    whiteSpace:'nowrap', 
                                    overflow:'hidden', 
                                    textOverflow:'ellipsis',
                                }}
                            >
                                {item.description}
                            </Typography>
                            <Tooltip title="Read article">
                                <Button 
                                    variant="contained" 
                                    size="small" 
                                    
                                    sx={{width:"10px"}}
                                >
                                <Typography  
                                    component='a' 
                                    href={`/post/${item._id}`} 
                                    sx={{textDecoration:"none", color:"white"}}
                                >
                                    <AutoStoriesIcon/>
                                </Typography>
                                </Button>
                            </Tooltip>
                        </Container>
                        </CardContent>
                    </Card>
                    ))}
            </Container>
        </Container>

        </>
    )
}