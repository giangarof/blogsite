import { Button, Container, Typography, Link as A, Box} from '@mui/material'
import React from 'react'
import {Link} from 'react-router-dom'

// components
import Footer from '../components/Footer'

const grid = {
  mt:'1rem',
  display:'grid',
  gridTemplateColumns:{xs:'repeat(1,1fr)' ,md:'repeat(2,2fr)'},
  gap:'1rem',
}

const outGrid = {
  backgroundColor:'rgba(0,0,0,0.05)',
  pt:'1rem',
  pb:'1rem',
  height:'100vh'
}

const description = {  
  width:'80%', padding:'5px',
}

const solo = {
  alignContent:'center',
  
  textAlign:'center'
}

export default function AboutMe() {
  return (
    <>
        <Box sx={outGrid}>
          <Container>
            <Link to='/'>
              <Button variant='outlined'>Go Back</Button>
            </Link>

            <Box sx={grid}>

              <Box sx={{order:{xs:1, md:1}, ...solo}}>Software Developer</Box>
              <Box sx={{order:{xs:2, md:2}, ...description}}>
                <p>3+ years experience as Software Developer.</p>
                <p>Proven expertise in Web Development lifecycle.</p>
                <p>Building innovative solutions meeting the business needs.</p>
                <p>Deployed fully scalable fullstack projects from end-to-end.</p>
                <p>Achieved 99% performance optimization for clients.</p>
                <p>Proficient in UI/UX, OOP, DOM, QA, Testing, Debugging.</p>
                <p>My stack: MERN, MEVN.</p>
              </Box>

              <Box sx={{order:{xs:4, md:3}, ...description}}>
                <p>3+ years experience in Data Analysis.</p>
                <p>Performed data cleaning and inspection to provided accurate reports.</p>
                <p>Successfully represented reports with data visualization tools. </p>
                <p>Created and tested complex queries in relational databases to retrieve data.</p>
                <p>Inspected large datasets to filter and clean data, performing complex Excel functions.</p>
                <p>Proficient with: Python, MySQL/SQL, Excel, PowerBI, Tableau. </p>
              </Box>
              <Box sx={{order:{xs:3, md:4}, ...solo}}>Data analyst</Box>

              <Box sx={{order:{xs:5, md:5}, ...solo}}>Certifications</Box>
              <Box sx={{order:{xs:6, md:6}, ...description}}>
                <p>Building, improving, and expanding my skills constantly.</p>
                <p>Under my belt:</p>
                <p>AWS:</p>
                <p>Cloud Practitioner - CLF C02</p>
                <p>Azure:</p>
                <p>AZ 900, AZ AI 900.</p>
              </Box>

            </Box>
          </Container>
        </Box>

        <Footer />
    </>
  )
}
