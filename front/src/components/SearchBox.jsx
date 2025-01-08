//react
import React, { useState, useEffect } from "react"
import {useParams, useNavigate} from 'react-router-dom'

//mui
import { TextField, Box, Container, FormLabel, colors, Divider, Paper, IconButton, ListItem, Typography, List } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';

//axios
import axios from 'axios';

export default function SearchBox() {
    const navigate = useNavigate('')
    const [keyword, setKeyword] = useState('')

    const [suggestions, setSuggestion] = useState([])

    const sx = {
        textalign:'center',
        width:'100%'
    }

    const search ={
        display:'flex',
        alignItems:'center',
        cursor:'pointer',
        padding: '2px 4px'
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()){
            setKeyword('')
            navigate(`/search/${keyword}`)
            setSuggestion([])
            // console.log(keyword)
        }else {
            navigate('/projects')
        }
    }

    useEffect(() => {
        const suggest = async () => {
            const {data} = await axios.get(`/api/post?keyword=${keyword}`)
            if(keyword !== ''){

                setSuggestion(data)
            }
            console.log(data)
        }
        const debounceFetch = setTimeout(suggest, 300); // Debounce fetch
        return () => clearTimeout(debounceFetch);
    }, [keyword])

    return (
        <>
            <Box sx={{mt:4, width:'100%'}}>
                <Box>
                    <Paper component="form" onSubmit={submitHandler} sx={search}>
                        <TextField 
                            type="text" 
                            onChange={(e) => setKeyword(e.target.value)} 
                            sx={sx}
                            id="outlined-basic" 
                                label="Search by technology" 
                                variant="outlined"/>
                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        <IconButton type="submit" aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                    
                </Box>
                <Box>
                    
                    {suggestions.length > 0 && (
                        <Paper sx={{ mt: 1,  }}>
                            <List>
                                {suggestions.map((item, i) => (
                                    <ListItem sx={{cursor:'pointer'}} key={i} onClick={() => navigate(`/post/${item._id}`)}>
                                        <Typography>{item.title} - {item.tech}</Typography>
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    )}
                </Box>

            </Box>
        </>
    )
}