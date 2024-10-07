import { Container,Box, Card, Button, CardContent, CardMedia, Typography, Link as A } from "@mui/material";
export default function Now() {
    const sx = {
        marginTop: '20px',
        display:'flex', flexDirection:'column',
        gap:'15px',
        width: {
            md:{
                width:'50%'
            }
        }
    }
    return(
        <>
            <Container sx={{display:'flex',justifyContent:'center'}}>
                <Box sx={sx}>
                    <p>Currently, I'm learning Java and PHP, to keep improving my current stack. </p>
                    <p>Besides that, I'm studying to get cloud certifications such AWS and Azure</p>
                    <p>And of course, I'm adding new features to my blog each time I do get an idea.</p>
                    <p style={{color:'grey'}}>Last Update: Sep 18, 2024</p>
                </Box>
            </Container>
        </>
    )
}