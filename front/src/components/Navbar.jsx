import { 
  AppBar, 
  Toolbar, 
  // IconButton, 
  Typography, Box } from "@mui/material";
 import { useEffect, useState } from "react";
import Logout from './Logout.jsx'
  
export default function Navbar() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  // const pages = ['home', 'main', 'more']
  const sx = {
    m:2, textDecoration:"none", color:'inherit'
  }

  const userInfo = () => {
      
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
                    <Typography sx={sx} component="a" href="/home">Home</Typography>
                    <Typography sx={sx} component="a" href="/signup">Register</Typography>
                    <Typography sx={sx} component="a" href="/signin">Login</Typography>
                    <Typography sx={sx} component="a" href="/new">New Post</Typography>
                    <Logout/>
                    {/* <Typography sx={sx} component="a" href="/logout">Logout</Typography> */}
                    {/* <Typography sx={sx} component="a" href="">Blog</Typography> */}
                    {/* <Typography sx={sx} component="a" href="">About</Typography> */}
                  </Box>
                </Toolbar>
              </AppBar>
            </>
        )
}