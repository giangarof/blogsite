import React, { useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Card, CardContent, TextField, Stack, Button, Tooltip } from "@mui/material";
import { Typography } from "@mui/joy";
import axios from "axios"

export default function DeleteNote(props) {
    // const {id, navigate} = props
    console.log(props)
    
    // Delete note
    const deleteBtn = async(id) => {
        try {
            const data = await axios.delete(`/api/note/${id}`)
            const res = data
            props.refetch()
            return res.data
            
        } catch (err) {
            console.log('something went wrong: ', err.message)
        }
    }
  return (
    <>
    <Tooltip title="click to delete">

        <Button 
            sx={{
                backgroundColor:'grey',
                '&:hover': {backgroundColor:'red'}
            }}
            variant="contained" 
            onClick={() => deleteBtn(props.postId)}
        >
            <Typography variant="h5" color="error">
                <DeleteIcon />
            </Typography>
        </Button>
    </Tooltip>
    </>
  )
}