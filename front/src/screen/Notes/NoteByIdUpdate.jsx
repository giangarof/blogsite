import { Textarea } from "@mui/joy";
import { Box, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import '../../quill.css'


export default function NoteByIdUpdate() {
    const [title, setTitle] = useState('')
    const [about, setAbout] = useState('')
    const [description, setDescription] = useState('')
    const [postId, setPostId] = useState('')
    const navigate = useNavigate()
    const {id} = useParams()


    const fetchPosts = async() =>{
        const res = await axios.get(`/api/note/${id}`)
        const updateData = res.data.data;
        setTitle(updateData.title)
        setAbout(updateData.about)
        setDescription(updateData.description)
        setPostId(updateData._id)
        // console.log(updateData)
        return updateData
    }

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleAbout = (e) => {
        setAbout(e.target.value)
    }
    const handleDescription = (e) => {
        setDescription(e.target.value)
    }

    const submitUpdate= async(id) => {
        const formData = {title, description, about}
        
        const data = await axios.put(`/api/note/${id}`, formData)

        // console.log(data);
        navigate(`/note/${postId}`)
    }

    useEffect(() => {
        fetchPosts()
    }, [id]);

    const outer = {
        marginTop:'2rem',
        display:'flex', flexDirection:'Column',
    }
    
    const box = {
        // boxShadow: '0px 0px 10px 0px',
        padding:'1rem',
        width:'90%',
        display:'flex', 
        flexDirection:'column', gap:2,
        // backgroundColor:'rgb(0, 0, 0, 0.12)',
        borderRadius:'7px',
      }

      const inner = {
        display:'flex', flexDirection:'column', gap:'1rem'
      }

      const fontOptions = [
        { label: 'Sans Serif', value: 'sans-serif' },
        { label: 'Serif', value: 'serif' },
        { label: 'Monospace', value: 'monospace' },
      ];

    const toolbarOptions = [
        [{ 'font': fontOptions.map(option => option.value) }],
        [{ 'header': [1, 2, false] }], // Headers
        ['bold', 'italic', 'underline', 'strike'], // Text styles
        ['blockquote', 'code-block'], // Block formats
        [{ 'list': 'ordered' }, { 'list': 'bullet' }], // Lists
        [{ 'script': 'sub' }, { 'script': 'super' }], // Subscript/Superscript
        [{ 'indent': '-1' }, { 'indent': '+1' }], // Indent/Outdent
        [{ 'direction': 'rtl' }], // Text direction
        [{ 'color': [] }, { 'background': [] }], // Color dropdowns
        [{ 'align': [] }], // Text alignment
        ['clean'], // Clear formatting button
        ['link', 'image', 'video'], // Insert link/image/video
    ];
    return(
        <>
            <Container sx={outer}>
            <Link to={`/note/${postId}`}>
                <Button variant='outlined'>Go Back</Button>
            </Link>
                <Box sx={box}>
                    <Box sx={inner}>
                        <Typography variant="h5">Note's Title</Typography>
                        <Textarea  id="outlined-basic" variant="outlined" 
                            value={title} 
                            onChange={handleTitle}
                        />

                        <Typography variant="h5">Brief explanation about the note</Typography>
                        <Textarea  id="outlined-basic" variant="outlined" 
                            value={about} 
                            onChange={handleAbout}/>

                        <Typography sx={{marginTop:4}} variant="h5">Description</Typography>
                        <ReactQuill 
                            className="content-preview"
                            value={description} 
                            onChange={setDescription} 
                            theme='snow'
                            modules={{ toolbar: toolbarOptions }}/>
                        
                    <Button 
                        sx={{marginTop:4, }}
                        variant="contained" size='small' 
                        onClick={() => submitUpdate(postId)} 
                    >
                        <Typography sx={{color:'white'}}>Update Changes</Typography>
                    </Button>
                    </Box>
                </Box>
            </Container>

        
        </>
    )
}