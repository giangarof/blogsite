//react
import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"

//mui
import { Box, Typography, Link as A, Container, Button, } from "@mui/material";

//dependencies
import axios from "axios"

//components
import CopyLink from '../../components/CopyLink';

//quill
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../quill.css'
import DOMPurify from 'dompurify';
import CircularIndeterminate from '../../components/Spinner';
import Meta from '../../components/Meta';


export default function () {
    const [note, setNote] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
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
        navigate(`/now`)
    }
    
    useEffect(() => {
        const isAdmin = JSON.parse(localStorage.getItem('isAdmin'))
        setIsAdmin(isAdmin)
        fetchPosts()
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

  return (

        <Container sx={{mt:3, mb:3}}>
            <Button variant='outlined' onClick={goBack}>Go Back</Button>
            <Box>
                {isLoading ? (
                    <CircularIndeterminate/>
                ) : (
                    <>
                        <Meta title={note.title} />
                        <Box sx={outer}>
                            <Box sx={box}>
                                <Box sx={inner}>
                                    <Typography>Title: {note.title}</Typography>
                                    <Typography>About: {note.about}</Typography>
                                    <Container 
                                        className='content-preview' 
                                        dangerouslySetInnerHTML={{ __html: sanitizedHTML }} /> 
                                </Box>
                                <Typography sx={{color:'grey', textAlign:'end'}}>Posted: {note.createdAt?.slice(0,10)}</Typography>
                            </Box>
                        </Box>
                    </>
            )}
            </Box>
        </Container>

  )
}