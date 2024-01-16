import { 
  AppBar, 
  Toolbar, 
  Typography, Box } from "@mui/material";

import { useEffect, useState } from "react";
import Logout from './Logout.jsx'
  
export default function Navbar(props) {
  const [userInfo, setUserInfo] = useState(null)
  const sx = {
    m:2, textDecoration:"none", color:'inherit'
  }
  
  useEffect(() => {
    const name = localStorage.getItem('name')
    setUserInfo(name)

  }, [])

        return(
            <>
              {userInfo ? (
              <AppBar position="static">
                <Toolbar display="center">
                <Typography variant="h4">
                    RNET
                  </Typography>
                  <Box sx={{ display:'flex', m:2}} >
                    <Typography sx={sx} component="a" href="/home">Home</Typography>
                    <Typography sx={sx} component="a" href="/new">New Post</Typography>
                    <Typography sx={sx} component="a"href="/profile/:id">Profile</Typography>
                    <Logout/>
                  </Box>
                </Toolbar>
              </AppBar>
              ): (
                // <div>
                  <AppBar position="static">
                    <Toolbar display="center">
                      <Typography variant="h4">
                        RNET
                      </Typography>
                    <Box sx={{ display:'flex', m:2}} >
                      <Typography sx={sx} component="a" href="/home">Home</Typography>
                      <Typography sx={sx} component="a" href="/signup">Register</Typography>
                      <Typography sx={sx} component="a" href="/signin">Login</Typography>
                    </Box>
                    </Toolbar>
                  </AppBar>
                // </div>
              )}
            </>
        )
}



