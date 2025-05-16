//react
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

//dependencies
import axios from "axios"

//MUI
import { Textarea } from "@mui/joy";
import { Box, Card, Button, CardContent, CardMedia, Typography, Tooltip, Hidden, Grid, TextField } from "@mui/material";

//components
import CircularIndeterminate from "../../components/Spinner";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../quill.css'

const UserUpdate = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

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

    // data to update
    const [user, setUser] = useState({
        name: '',
        username: '',
        email:'',
        password:'',
        about:'',
        isAdmin: Boolean
      })

    const profile = JSON.parse(localStorage.getItem('profile'));
    console.log(profile.id)
    const fetching = async() => {
        const res = await axios.get(`/api/user/profile/${profile.id}`)
        const user = res.data.user;
        console.log(user)
        setUser({
            name:  user.name,
            username:  user.username,
            email: user.email,
            password: user.password,
            about: user.about,
            isAdmin: user.isAdmin
        })
    }

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
      };

    const submitUpdate = async (id) => {
        setIsLoading(true)
        try {
            
            const {
                name, username, email, password, about
            } = user;

            
            const formData = {
                name, username, email, password, about
            };
    
            const res = await axios.put(`/api/user/profile/${id}`, formData)
            navigate(`/profile/${profile.id}`)
            // console.log(res.data)
        } catch (error) {
            console.log(error)
        } finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetching()
    },[])
    return (
        <>
            <Grid container justifyContent="center" >
                <Box 
                    sx={{
                        mt:3,
                        mb:3,
                        width:{
                            xs:'90%',
                            lg: '50%'
                        }
                    }}     
                    >
                    <Box sx={{display:'flex', flexDirection:'column', alignContent:'center', width:'100%', gap:'.5rem'}}>

                        <Typography>Is admin? </Typography>
                        <Typography>{user.isAdmin ? 'Yes' : 'no'}</Typography>
            
                        <Typography>Name</Typography>
                        <TextField name="name" value={user.name} onChange={handleChange}/>
            
                        <Typography>Username</Typography>
                        <TextField name="username" value={user.username} onChange={handleChange}/>
            
                        <Typography>Email</Typography>
                        <TextField name="email" value={user.email} onChange={handleChange}/>
            
                        <Typography>Password</Typography>
                        <TextField name="password" value={user.password} onChange={handleChange} type="password"/>
            
                        <Typography>Description Header</Typography>
                        {/* <TextField name="about" value={user.about} onChange={handleChange}/> */}

                        <ReactQuill 
                            name="about"
                            className='content-preview'
                            value={user.about} 
                            onChange={(value) => setUser({ ...user, about: value })}
                            theme='snow'
                            modules={{ toolbar: toolbarOptions }}
                        />
            
                    </Box>
                    <Button sx={{marginTop:4, width:'100%'}} variant="contained" onClick={() => submitUpdate(profile.id)}>{isLoading ? <CircularIndeterminate/> : "Update"}</Button>

                
                </Box>
            </Grid> 
        </>
    )
}

export default UserUpdate