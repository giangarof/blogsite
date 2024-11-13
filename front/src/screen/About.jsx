import { Button, Container, Typography } from '@mui/material'
import React from 'react'

export default function AboutMe() {
  return (
    <>
        <Container sx={{mt:3}}>
            <Button variant='outlined' href='/'>Go Back</Button>
            <Typography>Under development, come back soon!</Typography>
        </Container>
    </>
  )
}
