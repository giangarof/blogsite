import React, { useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { Box, Card, CardContent, TextField, Stack, Button } from "@mui/material";
import { Typography } from "@mui/joy";
import axios from "axios"

export default function DeletePost(props) {
    const {id, navigate} = props
    console.log(props.postId)
    
    // Delete post
    const deleteBtn = async(id) => {
        try {
            const data = await axios.delete(`/api/post/${id}`)
            const res = data
            // console.log(res.data)
            location.reload()
            navigate('')
            return res.data
            
        } catch (err) {
            console.log('something went wrong: ', err.message)
        }
    }
  return (
    <>
        <Button 
            sx={{backgroundColor:'red'}}
            variant="contained" 
            onClick={() => deleteBtn(props.postId)}
        >
            <Typography variant="h5" color="error">Delete</Typography>
        </Button>
    </>
  )
}
