import { Textarea } from "@mui/joy";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


export default function NoteByIdUpdate() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [postId, setPostId] = useState('')
    const navigate = useNavigate()
    const {id} = useParams()


    const fetchPosts = async() =>{
        const res = await axios.get(`/api/note/${id}`)
        const updateData = res.data.data;
        setTitle(updateData.title)
        setDescription(updateData.description)
        setPostId(updateData._id)
        // console.log(updateData)
        return updateData
    }

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }
    const handleDescription = (e) => {
        setDescription(e.target.value)
    }

    const submitUpdate= async(id) => {
        const formData = {title, description}
        
        const data = await axios.put(`/api/note/${id}`, formData)

        console.log(data);
        navigate('/now')
    }

    useEffect(() => {
        fetchPosts()
    }, [id]);

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
        backgroundColor:'rgb(0, 0, 0, 0.12)',
        borderRadius:'7px',
      }

      const inner = {
        display:'flex', flexDirection:'column', gap:'1rem'
      }
    return(
        <>
            <Box sx={outer}>
                <Box sx={box}>
                    <Box sx={inner}>
                        <Typography variant="h5">Title</Typography>
                        <Textarea  id="outlined-basic" variant="outlined" 
                            value={title} 
                            onChange={handleTitle}
                            // sx={{backgroundColor:'#fff'}}
                        />

                        <Typography sx={{marginTop:4}} variant="h5">Description</Typography>
                        <Textarea  id="outlined-basic" variant="outlined" 
                            value={description} 
                            onChange={handleDescription}
                            // sx={{backgroundColor:'#fff'}}
                        />
                        
                    <Button 
                        sx={{marginTop:4, }}
                        variant="contained" size='small' 
                        onClick={() => submitUpdate(postId)} 
                    >
                        <Typography sx={{color:'white'}}>Update Changes</Typography>
                    </Button>
                    </Box>
                </Box>
            </Box>

        
        </>
    )
}