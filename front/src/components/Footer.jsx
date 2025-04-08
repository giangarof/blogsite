import { Container, Box, colors, Typography } from "@mui/material";

export default function Footer() {
    const cYear = new Date().getFullYear()

    const footerBar ={
        pt:4, pb:4,
        // marginTop:4, marginBottom:4, 
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