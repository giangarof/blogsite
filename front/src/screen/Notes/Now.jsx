import { Container,Box, Card, Button, CardContent, CardMedia, Typography, Link as A, Tooltip } from "@mui/material";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

import axios from "axios";
import { useEffect, useState } from "react";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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
        backgroundColor:'rgba(0,0,0,0.03)',
        padding:'9px',
        width: {
            md:{
                width:'50%'
            }
        }
    }

    const iconUpdate = {
        cursor:'pointer',
        "&:hover":{
            color:'blue'

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

    return(
        <>  
            {isLoading ? <CircularIndeterminate /> : (
                <>
                    <Container sx={{mt:3}}>
                        <Button variant='outlined' href='/'>Go Back</Button>
                        <bOX sx={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                            {data.length == 0 ? 
                                <Box sx={{marginTop:'2rem'}}>
                                    <Typography>No notes yet ...</Typography>
                                </Box> : (
                                <>
                                    {data.map((i) => (
                                        <Box sx={sx} key={i._id}>
                                            <Typography>~ {i.title}</Typography>
                                            <Typography sx={intro}>{i.about}</Typography>
                                            <Tooltip title="Read article" >
                                                <Button variant="contained" size="small" sx={{width:"10px" }} href={`/note/${i._id}`}>
                                                    {/* <Typography component='a' sx={{textDecoration:"none", color:"white"}}> */}
                                                    <AutoStoriesIcon />
                                                    {/* </Typography> */}
                                                </Button>
                                            </Tooltip>
                                            <Box sx={{display:'flex', flexDirection:'column', alignItems:'end' }}>
                                                <Box>
                                                    {admin === true ?
                                                    <>
                                                            <Box>
                                                                <Tooltip title="Update">
                                                                    <A href={`/note/update/${i._id}`}>
                                                                        <EditIcon sx={iconUpdate} />
                                                                    </A>
                                                                </Tooltip>
                                                            </Box>
                                                    </> : ''
                                                    }
                                                </Box>
                                                <Typography sx={date}>Last update: {i.createdAt.slice(0,10)}</Typography>
                                            </Box>
                                        </Box>
                                    ))}
                                </>
                            )}
                        </bOX>
                    </Container>
                    <Meta title="Notes" />
                    
                </>
            )}
        </>
    )
}