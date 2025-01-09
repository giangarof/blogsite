//react
import React, { useState, useEffect } from "react"
import {useParams, useNavigate, Link} from 'react-router-dom'

//components
import SearchBox from '../../components/SearchBox'
import CircularIndeterminate from "../../components/Spinner";
import Meta from "../../components/Meta";

//mui
import { color, Container, display, positions, textAlign, width } from '@mui/system';
import { Box, Card, Button, CardContent, CardMedia, Typography, Tooltip, Hidden, Link as A, Divider } from "@mui/material";
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

    // Box that contains the content
    <Box sx={{backgroundColor:'rgba(0,0,0,0.05)', pt:3, pb:3}}>
        <Meta title="Software development" description="Projects to showcase my expertise as software developer."/>
        
        {/* first container | contains the "go back btn" */}
        <Container>
          <Link to='/'>
            <Button variant='outlined'>Go Back</Button>
          </Link>
        </Container>

        {/* second container | contains the posts */}
        {/* loads first, then it display it  */}
        <Container sx={{pb:3}}>
            {loading ? <>
                <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', gap:'1rem'}}>
                <CircularIndeterminate />
                <p>Loading, please wait!</p>
                </Box>
            </> : (
                <>
                    <SearchBox/>
                    <Box id="AllPosts">
                        <Typography sx={{marginTop:'2rem'}}>Total Projects: {post.length}</Typography>
                        <Box
                            sx={{
                                paddingTop:'1rem',
                                display: 'grid',
                                alignContent:'center', 
                                gridTemplateColumns: {
                                    xs: 'repeat(1, 1fr)',  
                                    md: 'repeat(2, 1fr)',  
                                },
                                gap: 4,
                            }}>   
                                    
                            {post.length > 0 ? (post.slice().reverse().map((item) => (
                                <Card 
                                    key={item._id} 
                                    sx={{
                                        boxShadow:'0px 0px 10px 0px',
                                        display: 'flex', flexDirection: 'column',
                                        // height:'100%'
                                    }}>
                                                    
                                {Array.isArray(item.image) && item.image.length > 0 && (
                                    <CardMedia 
                                        component='img'
                                        alt={item.title}
                                        image={item.image[0].url}
                                        sx={{
                                            backgroundColor:'rgb(0, 0, 0, 0.12)', 
                                            padding:1,
                                            height: 'auto',
                                              objectFit: {
                                                xs:'contain',
                                                sm: 'fill',
                                              },
                                            height: {
                                                xs:'auto',
                                                md: '300px',
                                            },
                                            width: '100%',
                                           
                                        }}/>
                                )}
                                    <Divider sx={{backgroundColor:'rgb(0, 0, 0, 0.12)',}}/>
                                    <CardContent 
                                        sx={{
                                            flexGrow:1,
                                            backgroundColor:'rgb(0, 0, 0, 0.12)',
                                            display:'flex', flexDirection:'column', gap:1                 
                                        }}>
                                       
                                            <Typography style={{ fontWeight: 600 }}>{item.title}</Typography>
                                            <Typography 
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
                                                </A>
                                            </Tooltip>
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
