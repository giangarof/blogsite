import { Container, Box, colors, Typography } from "@mui/material";

export default function Footer() {
    const cYear = new Date().getFullYear()

    const footerBar ={
        paddingTop:4, paddingBottom:4, 
        background: '#000',
    
    }
    const containerDeco = {
        display:'flex', flexDirection: 'row', justifyContent: 'center',
    }

    return (
        <>
        <Box sx={footerBar}>

            <Container sx={containerDeco}>
                <Box >
                    <Typography  
                        component='a' 
                        href="https://github.com/giangarof"
                        sx={{textDecoration:"none", color:"white", cursor:"pointer"}}
                    >
                        Gianmarco Garofalo &#169; {cYear}
                    </Typography>

                </Box>
            </Container>
        </Box>
        </>
    )
}