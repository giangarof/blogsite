import { Button, Container, Typography, Link as A, Box} from '@mui/material'
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

// components
import Footer from '../../components/Footer'
import axios from 'axios'
import DOMPurify from 'dompurify'

const grid = {
  mt:'1rem',
  display:'grid',
  gridTemplateColumns:{xs:'repeat(1,1fr)' ,md:'repeat(2,2fr)'},
  gap:'1rem',
  // pb: "2rem",
}

const outGrid = {
  pb:'2rem',
  backgroundColor:'rgba(0,0,0,0.05)',
  pt:'1rem',
  // pb:'2rem',
  // mb:'2rem',
  // height:{xs:'100vh', md:'none'},
  // height:{xs: 'none', md:'100vh'},
}

const description = {  
  width:'80%', padding:'5px',
}

const solo = {
  alignContent:'center',
  
  textAlign:'center'
}

export default function AboutMe() {
  
  const [user, setUser] = useState({
    about:''
  })
  
  const profile = JSON.parse(localStorage.getItem('profile'));
  
  const fetching = async() => {
    const res = await axios.get(`/api/user/profile/667f4bd0fb08d6e4e721b6fe`)
    setUser({ about: res.data.user.about})
  }
  const sanitizedHTML = DOMPurify.sanitize(user.about);

  useEffect(() => {
    fetching()
  },[])

  const box = {
    mt:4,
    
    '& p': {
      marginBottom: '.5rem',
    },
  }

  return (
    <>
        <Box sx={outGrid}>
          <Container>
            <Link to='/'>
              <Button variant='outlined'>Go Back</Button>
            </Link>

            <Box dangerouslySetInnerHTML={{ __html: sanitizedHTML }} sx={box}>

            </Box>
          </Container>
        </Box>

    </>
  )
}
