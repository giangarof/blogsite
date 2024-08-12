import { Container,Box, Card, Button, CardContent, CardMedia, Typography, Link as A } from "@mui/material";
export default function Now() {
    const sx = {
        marginTop: '20px',
        display:'flex', flexDirection:'column', gap:'15px'
        
        
    }
    return(
        <>
            <Container>
                <Box sx={sx}>
                    <p>Currently I'm pursuing a bachelor's degree; Electrical Engineering in Computer Science.</p>
                    <p>Besides that, I'm studying to get cloud certifications such AWS and Azure</p>
                    <p>Since I love programming and the software world, I'm learning Java and improving my current stack. </p>
                    <p>And of course, I'm adding new features to my blog each time I do get an idea.</p>
                    <p>Last Update: Aug 8, 2024</p>
                </Box>
            </Container>
        </>
    )
}