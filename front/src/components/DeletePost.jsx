//react
import React, { useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'

//mui
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Card, CardContent, TextField, Stack, Button, Tooltip } from "@mui/material";
import { Typography } from "@mui/joy";

//dependencies
import axios from "axios"

//components
import CircularIndeterminate from './Spinner';

export default function DeletePost(props) {
    const [isLoading, setIsLoading] = useState(false)
    // const {id, navigate} = props
    
    // Delete post
    const deleteBtn = async(id) => {
        // console.log(id)
        setIsLoading(true)
        try {
            const data = await axios.delete(`/api/post/${id}`)
            const res = data
            // console.log(data)
            props.refetch()
            return res.data
            
        } catch (err) {
            console.log('something went wrong: ', err.message)
        } finally{
            setIsLoading(false)
        }
    }
  return (
    <>
    <Tooltip title="click to delete">
        <Button 
            sx={{
                height:'60px',
                backgroundColor:'grey',
                '&:hover': {backgroundColor:'red'}
            }}
            variant="contained" 
            onClick={() => deleteBtn(props.postId)}
            >
                <Typography color="error">
                    {/* <DeleteIcon /> */}
                    {isLoading ? <CircularIndeterminate /> : <DeleteIcon />}
                </Typography>
        </Button>
    </Tooltip>
    </>
  )
}
