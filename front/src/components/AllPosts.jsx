//react
import React, { useState, useEffect } from "react"
import {useParams, useNavigate} from 'react-router-dom'
// import { useParams } from "react-router-dom";

//mui
import { color, Container, display, positions, textAlign, width } from '@mui/system';
import { Box, Card, Button, CardContent, CardMedia, Typography, Tooltip, Hidden } from "@mui/material";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

//components
import CircularIndeterminate from "./Spinner";

//devpendencies
import axios from "axios"

export default function AllPosts() {
    const [loading, setLoading] = useState(true);
    const {keyword} = useParams()
    const [post, setPost] = useState([])
    // const [img, setImg] = useState('')
    // const [isLoading, setIsLoading] = useState(null)

    // first way
    const fetchPosts = async() =>{
        try {
            const { data } = await axios.get('/api/post', {
                params: { keyword } // Send the keyword as a query parameter
            });
            const res = data
            // console.log(res)
            setPost(data)
            setLoading(false)
            // console.log(keyword)
            return res
            
        } catch (err) {
            console.log('something went wrong: ', err.message)
        }
      }
      
      useEffect(() => {
          fetchPosts()
      }, [keyword])

      const emptyQ = {
        color:'red',
        marginTop:'1rem'
      }

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
            {loading ? <CircularIndeterminate sx={{position:'absolute', left: '50%', 
        top: '50%', transform: 'translate(-50%, -50%)'}} />  : (

                <Container id="AllPosts">
                    <Typography sx={{marginTop:'2rem'}}>Total Projects: {post.length}</Typography>
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
                            
                            {post.length > 0 ? (post.slice().reverse().map((item) => (
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
                                        alt={item.title}
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
                                        justifyContent:'center',
                                        gap:'10px'
                                    }}>
                                    <Typography style={{ fontWeight: 600 }}>{item.title}</Typography>
                                    <Typography 
                                        // variant="p" 
                                        sx={{
                                            whiteSpace:'nowrap', 
                                            overflow:'hidden', 
                                            textOverflow:'ellipsis',
                                        }}
                                    >
                                        {item.description}
                                    </Typography>

                                    <Tooltip title="Read article" >
                                        <Button variant="contained" size="small" sx={{width:"10px", }} href={`/post/${item._id}`}>
                                            {/* <Typography component='a' sx={{textDecoration:"none", color:"white"}}> */}
                                            <AutoStoriesIcon />
                                            {/* </Typography> */}
                                        </Button>
                                    </Tooltip>
                                </Container>
                                </CardContent>
                            </Card>
                            ))): 
                                <Typography sx={emptyQ}>
                                    No technology found with your query. 
                                </Typography>
                            }
                            
                            
                            
                    </Container>
                </Container>
            )
            
            }
        </>
        
    )
}