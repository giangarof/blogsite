//react
import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"

//mui
import { Box, Typography, Link as A, Container, Button, Tooltip, } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

//dependencies
import axios from "axios"

//components
import CopyLink from '../../components/CopyLink';
import Meta from '../../components/Meta';

//quill
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../quill.css'
import DOMPurify from 'dompurify';
import CircularIndeterminate from '../../components/Spinner';


export default function () {
    const [note, setNote] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    const [isAdmin, setIsAdmin] = useState(false)
    const userId = localStorage.getItem('userId')

    const {id} = useParams()
    const navigate = useNavigate()
    
    const fetchPosts = async() => {
        setIsLoading(true)
        try {
            const data = await axios.get(`/api/note/${id}`)
            const res = data
            setNote(res.data.data)
            // console.log(res.data.data)
            return res.data
            
        } catch (err) {
            console.log('something went wrong: ', err.message)
        } finally{
            setIsLoading(false)
        }
    }
    
    const updatePostScreen = async(id) => {
        navigate(`/note/update/${id}`)
    }
    
    const goBack = async() => {
        navigate(`/myblog`)
    }
    
    useEffect(() => {
        const isAdmin = JSON.parse(localStorage.getItem('isAdmin'))
        setIsAdmin(isAdmin)
        fetchPosts()
        // fetchUser()
    }, [id])
    const sanitizedHTML = DOMPurify.sanitize(note.description);
    
      const outer = {
        marginTop:'2rem',
        display:'flex', flexDirection:'row', justifyContent: 'center',
    }
    
    const box = {
        boxShadow: '0px 0px 10px 0px',
        padding:'1rem',
        width:'90%',
        display:'flex', 
        flexDirection:'column', gap:2,
        backgroundColor:'rgb(0, 0, 0, 0.03)',
        borderRadius:'7px',
      }

      const inner = {
        display:'flex', flexDirection:'column', gap:'1rem'
      }

      const iconUpdate = {
        cursor:'pointer',
        "&:hover":{
            color:'blue'

        }
    }

  return (
    <>
        <Box sx={{backgroundColor:'rgba(0,0,0,0.05)', pt:3, pb:3}}>

            <Container >
                <Button variant='outlined' onClick={goBack}>Go Back</Button>
            </Container>
        
            <Container>
            
                    {isLoading ? <>
                        <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', gap:'1rem'}}>
                            <CircularIndeterminate />
                            <p>Loading, please wait!</p>
                        </Box>
                    </> : (
                        <>
                            <Meta title={note.title} description={note.description} />
                            <Box sx={outer}>
                                <Box sx={box}>
                                    <Box sx={inner}>
                                        <Typography variant='h5'>{note.title}</Typography>
                                        <Typography>{note.about}</Typography>
                                        <Container 
                                            className='content-preview' 
                                            dangerouslySetInnerHTML={{ __html: sanitizedHTML }} /> 
                                    </Box>
                                    <Box sx={{display:'flex', flexDirection:'column', alignItems:'end', gap:'1rem'}}>
                                        {isAdmin === true ?
                                        <>
                                                <Box sx={{display:'flex', gap:'1rem', justifyItems:'center', alignItems:'center'}}>
                                                    <Tooltip title="Update">
                                                        <A href={`/note/update/${note._id}`}>
                                                            <EditIcon sx={iconUpdate} />
                                                        </A>
                                                    </Tooltip>
                                                    <CopyLink/>
                                                </Box>
                                        </> : <CopyLink/>
                                        }
                                        <Typography sx={{color:'grey', textAlign:'end'}}>Posted: {note.createdAt?.slice(0,10)}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </>
                )}
                
            </Container>
        </Box>
    </>


  )
}
