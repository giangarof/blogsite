import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// MUI
import { AppBar, Toolbar, Box, IconButton, Menu, MenuItem, Link as MuiLink, Button } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

// Components
import Logout from './Logout.jsx';

const menuItems = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "My Blog", to: "/myblog" },
  { label: "About Me", to: "/about" },
];

export default function Navbar() {
  const [profile, setProfile] = useState({ id: '', name: '', isAdmin: false });
  const data = JSON.parse(localStorage.getItem('profile')) ?? {};

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  useEffect(() => {
    if (data.id) setProfile({ id: data.id, name: data.name, isAdmin: data.isAdmin || false });
  }, [data]);

  const desktopLinkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 500,
    '&:hover': { color: 'rgba(255,255,255,0.7)' }
  };

  const mobileLinkStyle = {
    color: 'black',
    textDecoration: 'none',
    '&:hover': { color: 'primary.main' }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#000" }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        
        {/* Logo / Home */}
        <MuiLink component={Link} to="/" sx={{ color: 'white', fontWeight: 600, fontSize: 20, textDecoration: 'none' }}>
          MyPortfolio
        </MuiLink>

        {/* Mobile Menu */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton size="large" color="inherit" onClick={handleOpenNavMenu}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElNav}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            PaperProps={{ sx: { backgroundColor: 'white' } }}
          >
            {menuItems.map((item) => (
              <MenuItem key={item.to} onClick={handleCloseNavMenu}>
                <MuiLink component={Link} to={item.to} sx={mobileLinkStyle}>
                  {item.label}
                </MuiLink>
              </MenuItem>
            ))}

            {profile.id && (
              <>
                <MenuItem onClick={handleCloseNavMenu}>
                  <MuiLink component={Link} to={`/profile/${profile.id}`} sx={mobileLinkStyle}>
                    {profile.name}
                  </MuiLink>
                </MenuItem>
                <MenuItem>
                  <Logout />
                </MenuItem>
              </>
            )}
          </Menu>
        </Box>

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3 }}>
          {menuItems.map((item) => (
            <MuiLink key={item.to} component={Link} to={item.to} sx={desktopLinkStyle}>
              {item.label}
            </MuiLink>
          ))}
          {profile.id && (
            <>
              <MuiLink component={Link} to={`/profile/${profile.id}`} sx={desktopLinkStyle}>
                {profile.name}
              </MuiLink>
              <Logout />
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}






