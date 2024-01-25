import React, { useState, useEffect } from "react"
import axios from "axios"

import { Container } from '@mui/system';
import { Box, Card, Button, CardContent, CardMedia, Typography, Tooltip } from "@mui/material";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

export default function AllPosts() {
    const [post, setPost] = useState([])
    const [img, setImg] = useState('')
    const [isLoading, setIsLoading] = useState(null)

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
      

    return(
        // <>
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <Container sx={{
                            // width: {sm:'100%', lg:'70%'},
                            display:{
                                md:'flex', lg:'grid'
                            },
                            alignContent:'center', 
                            gridTemplateColumns: 'repeat(2, 1fr)', 
                            gap:3, 
                            margin:'20px auto 20px auto', 
                            // paddingTop:15,
                            // marginBottom:4
                    }}>

                        {post.slice().reverse().map((item) => (
                            <Card 
                                key={item._id} 
                                // sx={{marginTop:5, boxShadow:'0px 0px 20px 0px'}}
                                // style={{
                                //     width:"500px",
                                //   }}
                            >
                                
                            {Array.isArray(item.image) && item.image.length > 0 && (
                                <CardMedia 
                                    // sx={{height:'auto'}} 
                                    // style={{
                                    //     height:"350px",
                                    //     objectFit:'contain',
                                    // }}
                                    component='img'
                                    image={item.image[0].url}
                                />
                            )}

                                <CardContent sx={{
                                    backgroundColor:'rgb(0, 0, 0, 0.12)',
                                    
                                }}
                                >
                                    <Typography variant="h4">{item.title}</Typography>
                                    <Typography 
                                        variant="h5" 
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
                                            sx={{marginTop:"10px"}}
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
                                </CardContent>
                            </Card>
                        ))}
                    </Container>
                </div>
            )}

        </div>
        // </>
    )
}       