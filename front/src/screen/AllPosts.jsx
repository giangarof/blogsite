import React, { useState, useEffect } from "react"
import axios from "axios"

import { Box, Card, Button, CardContent, CardMedia, Typography } from "@mui/material";

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
                    <Box sx={{
                            width:'70%',
                            display:'grid', 
                            alignContent:'center', 
                            gridTemplateColumns: 'repeat(2, 1fr)', 
                            gap:3, 
                            margin:'auto', 
                            marginBottom:4
                    }}>

                        {post.map((item) => (
                            <Card 
                                key={item._id} 
                                sx={{marginTop:5, boxShadow:'0px 0px 20px 0px'}}
                                style={{
                                    width:"500px",
                                  }}
                            >
                                
                            {Array.isArray(item.image) && item.image.length > 0 && (
                                <CardMedia 
                                    sx={{height:'auto'}} 
                                    style={{
                                        height:"350px",
                                        objectFit:'contain',
                                    }}
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
                                    Read Article
                                    </Typography>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </div>
            )}

        </div>
        // </>
    )
}       