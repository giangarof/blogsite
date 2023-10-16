import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
export default function Register() {
  const pages = ['home', 'main', 'more']
  const sx = {
    m:2, textDecoration:"none", color:'inherit'
  }
        return(
            <>
              <AppBar position="static">
                <Toolbar display="center">
                  <Typography variant="h4">
                    RNET
                  </Typography>
                  {/* <Box sx={{ display:'flex'}}>
                    {pages.map((page) => (
                      <Typography 
                        key={page} 
                        textAlign="center"
                        component="a"
                        href="signin"
                        sx={{m:2}}
                        >
                          {page}
                      </Typography>))}
                  </Box> */}
                  <Box sx={{ display:'flex', m:2}} >
                    <Typography sx={sx} component="a" href="/register">Register</Typography>
                    <Typography sx={sx} component="a" href="/signin">Login</Typography>
                    <Typography sx={sx} component="a" href="">Blog</Typography>
                    <Typography sx={sx} component="a" href="">About</Typography>
                  </Box>
                </Toolbar>
              </AppBar>
            </>
        )
}