import { Container,Box, Card, Button, CardContent, CardMedia, Typography, Link as A, Tooltip } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
export default function Now() {
    const [data,setData] = useState([]);
    const [admin,setAdmin] = useState(false);
    const userId = localStorage.getItem('userId')

    const fetching = async() => {
        const res = await axios.get(`/api/note/`)
        setData(res.data)
        console.log(res.data)
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
        gap:'.2rem',
        backgroundColor:'rgba(0,0,0,0.06)',
        padding:'9px',
        width: {
            md:{
                width:'50%'
            }
        }
    }

    const iconDelete = {
        cursor:'pointer',
        "&:hover":{
            color:'red'

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

    return(
        <>
            <Container sx={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                {data.map((i) => (
                    <Box sx={sx} key={i._id}>
                        <Typography>~ {i.title}</Typography>
                        <Typography>{i.description}</Typography>
                        {admin === true ?
                        <>
                                <Box>
                                    <Tooltip title="Update">
                                        <EditIcon sx={iconUpdate}/>
                                    </Tooltip>
                                    <Tooltip title="Delete">

                                        <DeleteIcon sx={iconDelete}/>
                                    </Tooltip>
                                </Box>
                        </> : ''
                        }
                        <Typography sx={date}>Created: {i.createdAt.slice(0,10)}</Typography>
                    </Box>
                ))}
            </Container>
        </>
    )
}