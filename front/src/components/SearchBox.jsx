import React, { useState, useEffect } from "react"
import {useParams, useNavigate} from 'react-router-dom'
import { TextField, Box, Container, FormLabel, colors, Divider, Paper, IconButton } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBox() {
    const navigate = useNavigate('')
    const {keyword: urlKeyword} = useParams()
    const [keyword, setKeyword] = useState('')
    const [submit, setSubmit] = useState('')

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
        }else {
            navigate('/projects')
        }
    }

    return (
        <>
        <Container sx={{mt:4}}>
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

        </Container>
            {/* <Container>
                <Box onSubmit={submitHandler}>
                    <FormLabel>
                        <TextField
                            // onSubmit={submitHandler}
                            onChange={(e) => {setKeyword(e.target.value)}}
                            value={keyword}
                            sx={sx} 
                            id="outlined-basic" 
                            label="Search by technology" 
                            variant="outlined" />
                            <TextField
                            
                            value={keyword}
                            />
                            <button type="submit">submit</button>
                    </FormLabel>

                </Box>
            </Container> */}
        </>
    )
}