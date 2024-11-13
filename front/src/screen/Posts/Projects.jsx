import React from 'react'
import SearchBox from '../../components/SearchBox'
import AllPosts from '../../components/AllPosts'
import { Button, Container } from '@mui/material'

export default function Projects() {
  return (
    <>  
      <Container sx={{mt:3}}>
          <Button variant='outlined' href='/'>Go Back</Button>
          <SearchBox/>
          <AllPosts/>
      </Container>
    </>
  )
}
