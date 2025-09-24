import { 
  AppBar, 
  Toolbar, 
  Typography, Box, Tooltip, IconButton, Icon, Avatar, Stack, Container, Link as A, 
  Menu,
  MenuItem} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

import { useEffect, useState } from "react";
import Logout from './Logout.jsx'
import { Link } from "react-router-dom";
  
export default function Navbar() {
  const [profile, setProfile] = useState({
    id:'',
    name:'',
    isAdmin:Boolean
  })
  const data = JSON.parse(localStorage.getItem('profile')) ?? ''
  // console.log(profile)

  const [anchorElNav, setAnchorElNav] = useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const sx = {
    cursor:'pointer',
    color:'white'
  }
  
  useEffect(() => {
    setProfile({
      id:data.id,
      name:data.name,
    })

  }, [])

        return(
            <>
              {profile.id ? (
              <Box sx={{backgroundColor:"#000", color:'#fff'}}>
                <Toolbar sx={{backgroundColor:"#000", color:'#fff'}}>
                  <Box sx={{ display:'flex', justifyContent:'space-between', width:'100%'}} >

                    {/* Mobile view */}
                    <Box sx={{ display:{xs:'flex', md:'none', cursor:"pointer"}}}>
                      <IconButton
                        size="large"
                        aria-label="open navigation menu"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color='inherit'
                        onClick={handleOpenNavMenu} >
                        
                        <MenuIcon />
                      </IconButton>
                      <Menu 
                        open={Boolean(anchorElNav)} 
                        onClose={handleCloseNavMenu}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        anchorEl={anchorElNav} 
                        sx={{cursor:'pointer', mt:5}}>
                          
                        <MenuItem>
                          <A to="/" component={Link} color="inherit" underline='none'>
                            Home
                          </A>
                        </MenuItem>
                        <MenuItem>
                          <A to={`/profile/${profile.id}`} component={Link} color="inherit" underline='none'>
                            {profile.name}
                          </A>
                        </MenuItem>
                        <MenuItem sx={{alignItems:'center'}}>
                          <Logout/>
                        </MenuItem>
                      </Menu>
                    </Box>

                    {/* Desktop View */}
                    <Box sx={{display:{xs:'none', md:'flex'}, justifyContent:'space-between',  width:'100%'}}>
                      <Box sx={{ display:'flex', gap:'10px'}}>
                        <A to='/' component={Link} color="inherit" underline='none'>
                          <h2>Home</h2>
                        </A>
                      </Box>
                      <Box sx={{display:'flex', gap:'10px', alignItems:"center"}}>
                        <A to={`/profile/${profile.id}`} component={Link} color="inherit" underline='none' sx={sx}>
                          <h2>{profile.name}</h2>
                        </A>
                        
                        <Typography sx={sx}>
                          <Logout/>
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Toolbar>
              </Box>
              ) : (
                // <div>
                  <Box sx={{backgroundColor:"#000", color:'#fff'}}>
                    <Toolbar sx={{backgroundColor:"#000", color:'#fff'}}>
                      <Box sx={{
                          display:'flex', 
                          justifyContent:'space-between', 
                          width:'100%', textAlign:'center'
                        }}>
                        {/* Mobile view */}
                        <Box sx={{ display:{xs:'flex', md:'none', cursor:"pointer"}}}>
                          <IconButton
                            size="large"
                            aria-label="open navigation menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color='inherit'
                            onClick={handleOpenNavMenu} >
                            
                            <MenuIcon />
                          </IconButton>
                          <Menu 
                            open={Boolean(anchorElNav)} 
                            onClose={handleCloseNavMenu}
                            anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }}
                            anchorEl={anchorElNav} 
                            sx={{cursor:'pointer', mt:5}}>
                              
                            <MenuItem>
                              <A to="/" component={Link} color="inherit" underline='none'>
                                Home
                              </A>
                            </MenuItem>
                            <MenuItem>
                              <A to="/projects" component={Link} color="inherit" underline='none'>
                                Projects
                              </A>
                            </MenuItem>
                            <MenuItem>
                              <A to="/myblog" component={Link} color="inherit" underline='none'>
                                My Blog
                              </A>
                            </MenuItem>
                            <MenuItem>
                              <A to="/about" component={Link} color="inherit" underline='none'>
                                About Me
                              </A>
                            </MenuItem>
                          </Menu>
                        </Box>

                        {/* Desktop View */}
                        <Box sx={{display:{xs:'none', md:'flex'}, justifyContent:'space-between',  width:'100%'}}>
                          <Box sx={{ display:'flex', gap:'10px'}}>
                            <A to='/' component={Link} color="inherit" underline='none'>
                              <h3>Home</h3>
                            </A>
                          </Box>
                        </Box>
                      </Box>
                    </Toolbar>
                  </Box>
                // </div>
              )}
            </>
        )
}



