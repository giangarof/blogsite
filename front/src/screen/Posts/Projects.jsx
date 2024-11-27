//react
import React, { useState, useEffect } from "react"
import {useParams, useNavigate, Link} from 'react-router-dom'

//components
import SearchBox from '../../components/SearchBox'
import CircularIndeterminate from "../../components/Spinner";
import Meta from "../../components/Meta";

//mui
import { color, Container, display, positions, textAlign, width } from '@mui/system';
import { Box, Card, Button, CardContent, CardMedia, Typography, Tooltip, Hidden, Link as A } from "@mui/material";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

//devpendencies
import axios from "axios"

export default function Projects() {
  const [loading, setLoading] = useState(false);
  const {keyword} = useParams()
  const [post, setPost] = useState([])

  // first way
  const fetchPosts = async() =>{
    setLoading(true)
    try {
        const { data } = await axios.get('/api/post', {
            params: { keyword } // Send the keyword as a query parameter
        });
        const res = data
        // console.log(res)
        setPost(data)
        // setLoading(false)
        // console.log(keyword)
        return res
        
    } catch (err) {
        console.log('something went wrong: ', err.message)
    } finally{
        setLoading(false)
    }
  }
  
  useEffect(() => {
      fetchPosts()
  }, [keyword])

  const emptyQ = {
    color:'red',
    marginTop:'1rem'
  }
  return (
    <Box sx={{backgroundColor:'rgba(0,0,0,0.05)', pt:3, pb:3}}>
        <Meta title="Software development" description="Projects to showcase my expertise as software developer."/>
        <Container>
          <Link to='/'>
            <Button variant='outlined'>Go Back</Button>
          </Link>
        </Container>
        <Container>
            {loading ? <>
                <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', gap:'1rem'}}>
                <CircularIndeterminate />
                <p>Loading, please wait!</p>
                </Box>
            </>: (
                <>
                <SearchBox/>
                <Box id="AllPosts">
                    <Typography sx={{marginTop:'2rem'}}>Total Projects: {post.length}</Typography>
                    <Box
                        sx={{
                            display: 'grid',
                            alignContent:'center', 
                            gridTemplateColumns: {
                                sm: 'repeat(1, 1fr)',  
                                md: 'repeat(2, 1fr)',  
                            },
                            gap: 4,
                        }}>   
                                
                        {post.length > 0 ? (post.slice().reverse().map((item) => (
                            <Card 
                                key={item._id} 
                                sx={{
                                    width:'100%',
                                    marginTop:5, boxShadow:'0px 0px 10px 0px',
                                    // display: 'flex',
                                    // flexDirection: {xs: 'row', lg: 'column'}
                                }}>
                                                
                            {Array.isArray(item.image) && item.image.length > 0 && (
                                <CardMedia 
                                    component='img'
                                    alt={item.title}
                                    image={item.image[0].url}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center', /* Horizontally center the content */
                                        alignItems: 'center', /* Vertically center the content */
                                        height: '33vh',
                                        objectFit:'contain'
                                        }}/>
                            )}
                                <CardContent 
                                    sx={{
                                        backgroundColor:'rgb(0, 0, 0, 0.12)',
                                        display:'flex', 
                                        flexDirection:"column", 
                                        justifyContent:'center',                        
                                    }}>
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
                                            <A component={Link} to={`/post/${item._id}`}>
                                                <Button variant="contained" size="small">
                                                    <AutoStoriesIcon/>
                                                </Button>
                                            </A >
                                        </Tooltip>
                                    </Container>
                                    </CardContent>
                                </Card>
                        ))) : 
                            <Typography sx={emptyQ}>
                                No technology found with your query. 
                            </Typography>
                        }   
                    </Box>
                </Box>
                </>)}
        </Container>
    </Box>
  )
}
