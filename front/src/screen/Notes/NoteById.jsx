import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import { Box, Card, Button, CardContent, CardMedia, Typography, Tooltip, Snackbar, Link as A, SnackbarContent } from "@mui/material";

import axios from "axios"
import CopyLink from '../../components/CopyLink';

export default function () {
    const [note, setNote] = useState('')
    const [isLoading, setIsLoading] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false)
    const {id} = useParams()
    const navigate = useNavigate()

    const fetchPosts = async() =>{
        try {
            const data = await axios.get(`/api/note/${id}`)
            const res = data
            setNote(res.data.data)
            console.log(res.data.data)
            return res.data
            
        } catch (err) {
            console.log('something went wrong: ', err.message)
        }
    }

    const updatePostScreen = async(id) => {
        navigate(`/note/update/${id}`)
    }

    const goBack = async() => {
        navigate(`/`)
    }
    
    useEffect(() => {
          const isAdmin = JSON.parse(localStorage.getItem('isAdmin'))
          setIsAdmin(isAdmin)
          fetchPosts()
      }, [id])

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

        <>
            <Box>
                {isLoading ? (
                <p>Loading...</p>
                ) : (
                    <Box sx={outer}>
                        <Box sx={box}>
                            <Box sx={inner}>
                                <Typography>{note.title}</Typography>
                                <Typography>{note.description}</Typography>
                            </Box>
                            <Typography sx={{color:'grey', textAlign:'end'}}>Posted: {note.createdAt?.slice(0,10)}</Typography>
                        </Box>
                    </Box>
            )}
            </Box>
        </>

  )
}
