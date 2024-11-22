//react
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//mui
import { Container,Box, Card, Button, CardContent, CardMedia, Typography, Link as A, Tooltip } from "@mui/material";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

//dependencies
import axios from "axios";

//components
import CircularIndeterminate from "../../components/Spinner";
import Meta from "../../components/Meta";

export default function Now() {
    const [isLoading, setIsLoading] = useState(false)
    const [data,setData] = useState([]);
    const [admin,setAdmin] = useState(false);
    const userId = localStorage.getItem('userId')

    const fetching = async() => {
        setIsLoading(true)
        try {
            const res = await axios.get(`/api/note/`)
            setData(res.data)
        } catch (error) {
            console.log(error)
            
        } finally{
            setIsLoading(false)
        }
    }

    const fetchUser = async () => {
        const res = await axios.get(`/api/user/profile/${userId}`)
        setAdmin(res.data.user.isAdmin)
    }
    
    useEffect(() => {
        fetching()
        fetchUser()
    }, [])
    
    const sx = {
        borderRadius:'7px',
        boxShadow:'0px 0px 10px 0px',
        marginTop: '20px',
        display:'flex', flexDirection:'column',
        gap:'1rem',
        // backgroundColor:'rgba(0,0,0,0.03)',
        padding:'9px',
        width: {
            md:{
                width:'100%'
            }
        }
    }
    const date = {
        color:'gray',
        textAlign:'right',
        // margin:'50px'
    }

    const intro ={
        color:'#666565',
        fontStyle:'italic'
    }

    const grid = {
        width:'100%',
        display:'grid', 
        gap:'1rem',
        gridTemplateColumns: {
        sm: 'repeat(1, 1fr)',  
        md: 'repeat(2, 1fr)',  
    },

    }

    return(
        <>  
            {isLoading ? <CircularIndeterminate /> : (
                <>
                    <Container sx={{mt:3}}>
                        <Link to='/'>
                            <Button variant='outlined'>Go Back</Button>
                        </Link>
                        <Box sx={grid}>
                            {data.map((i) => (
                                <Box sx={sx} key={i._id}>
                                    <Typography>~ {i.title}</Typography>
                                    <Typography sx={intro}>{i.about}</Typography>
                                    <Box sx={{display:'flex', gap:'1rem'}}>
                                        <Tooltip title="Read article" >
                                        <A component={Link} to={`/note/${i._id}`}>
                                            <Button variant="contained" size="small">
                                                <AutoStoriesIcon/>
                                            </Button>
                                        </A >
                                        </Tooltip>
                                    </Box>
                                    <Box sx={{display:'flex', flexDirection:'column', alignItems:'end' }}>
                                        <Typography sx={date}>Update: {i.createdAt.slice(0,10)}</Typography>
                                    </Box>
                                </Box>
                                    ))} 
                        </Box>
                    </Container>
                    <Meta title="Notes" />
                    
                </>
            )}
        </>
    )
}