import React, { useState, useEffect } from "react"
import {useParams, useNavigate} from 'react-router-dom'
import { TextField, Box, Container, FormLabel } from "@mui/material"
export default function SearchBox() {
    const navigate = useNavigate('')
    const {keyword: urlKeyword} = useParams()
    const [keyword, setKeyword] = useState('')
    const [submit, setSubmit] = useState('')

    const sx = {
        textalign:'center',
        width:'100%'
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()){
            setKeyword('')
            navigate(`/search/${keyword}`)
        }else {
            navigate('/')
        }
    }

    return (
        <>
        <Container>
            <Box>

                <form onSubmit={submitHandler}>
                    <TextField 
                        type="text" 
                        onChange={(e) => setKeyword(e.target.value)} 
                        sx={sx}
                        id="outlined-basic" 
                            label="Search by technology" 
                            variant="outlined"/>
                </form>
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