import axios from "axios"
import { useEffect, useState } from "react"
import { Box, Card, Button, CardContent, CardMedia, Typography, Tooltip, Hidden, Grid, TextField } from "@mui/material";
import { Textarea } from "@mui/joy";
import { useNavigate } from "react-router-dom";
const UserUpdateForm = () => {
    const [user, setUser] = useState('')

    // data to update
    const [name, setName] = useState('')
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [about, setAbout] = useState('')

    const userId = localStorage.getItem('userId')
    const navigate = useNavigate()
    // console.log(userId)
    const fetching = async() => {
        const res = await axios.get(`/api/user/profile/${userId}`)
        setUser(res.data.user)
        const user = res.data.user
        setName(user.name)
        setUserName(user.username)
        setEmail(user.email)
        setPassword(user.password)
        setAbout(user.about)
        // console.log(res.data.user)
    }

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleUserName = (e) => {
        setUserName(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleAbout = (e) => {
        setAbout(e.target.value)
    }


    const submitUpdate = async (id) => {
        try {
            
            const formData = {
                name, username, email, password, about
            }
    
            const res = await axios.put(`/api/user/profile/${id}`, formData)
            navigate('/')
            // console.log(res.data)
        } catch (error) {
            console.log(error)
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
                        <TextField value={name} onChange={handleName}/>
            
                        <Typography>Username</Typography>
                        <TextField value={username} onChange={handleUserName}/>
            
                        <Typography>Email</Typography>
                        <TextField value={email} onChange={handleEmail}/>
            
                        <Typography>Password</Typography>
                        <TextField value={password} onChange={handlePassword} type="password"/>
            
                        <Typography>Description Header</Typography>
                        <TextField value={about} onChange={handleAbout}/>
            
                    </Box>
                    <Button sx={{marginTop:4, width:'100%'}} variant="contained" onClick={() => submitUpdate(userId)}>Update</Button>

                
                </Box>
            </Grid> 
        </>
    )
}

export default UserUpdateForm

// I'm a software developer with a extensive stack, I do mainly work with MERN and MEVN. Dedicated frontend developer who loves to work with API's.

// Star wars expert and The Big Bang Theory fan.
