import { Button, Container, Typography, Link as A } from '@mui/material'
import React from 'react'
import {Link} from 'react-router-dom'

export default function AboutMe() {
  return (
    <>
        <Container sx={{mt:3}}>
          <Link to='/'>
            <Button variant='outlined'>Go Back</Button>
          </Link>
            <Typography>Under development, come back soon!</Typography>
        </Container>
    </>
  )
}
