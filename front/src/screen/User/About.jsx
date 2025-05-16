import { Button, Container, Typography, Link as A, Box} from '@mui/material'
import React from 'react'
import {Link} from 'react-router-dom'

// components
import Footer from '../../components/Footer'

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
                {/* <p>3+ years experience as Software Developer.</p> */}
                <p>Expertise in Web Development lifecycle.</p>
                <p>Delivering innovative solutions tailored to business needs</p>
                <p>Deployed fully scalable fullstack projects from end-to-end.</p>
                <p>Achieved 99% performance optimization for using google lighthouse.</p>
                <p>Proficient in UI/UX, OOP, DOM, QA, Testing, Debugging.</p>
                <p>I do code in: Java, JS/TS, SQL, PHP.</p>
                <p>My stack: MERN, MEVN, LAMP.</p>
              </Box>

              <Box sx={{order:{xs:4, md:3}, ...description}}>
                <p>Performed data cleaning and inspection to provided accurate reports.</p>
                <p>Successfully represented reports with data visualization tools. </p>
                <p>Created and tested complex queries in relational databases to retrieve data.</p>
                <p>Inspected large datasets to filter and clean data, performing complex Excel functions.</p>
                <p>Proficient with: Python, MySQL/SQL, Excel, PowerBI, Tableau. </p>
              </Box>
              <Box sx={{order:{xs:3, md:4}, ...solo}}>Data analyst</Box>

              <Box sx={{order:{xs:5, md:5}, ...solo}}>Cloud Specialist</Box>
              <Box sx={{order:{xs:6, md:6}, ...description}}>
                <p>I design, implement, and manage cloud-based solutions that optimize performance, scalability, and security.</p>
                <p>Under my belt:</p>
                <p>AWS:</p>
                <p>Cloud Practitioner - CLF C02</p>
                <p>Azure:</p>
                <p>AZ 900, AZ AI 900.</p>
              </Box>

              <Box sx={{order:{xs:7, md:8}, ...solo}}>Cybersecurity Analyst</Box>
              <Box sx={{order:{xs:8, md:7}, ...description}}>
                <p>Aware of the latest threats and best practice for secure a website/network.</p>
                <p>Proficient in reading logs from nmap, wireshark.</p>
                <p>Skilled to test website vulnerabilities and report them in detail.</p>
                <p>Bug hunter and Ethical.</p>
              </Box>

            </Box>
          </Container>
        </Box>

    </>
  )
}
