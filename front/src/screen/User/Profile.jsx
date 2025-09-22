import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from 'dompurify';

import {
  Container,
  Paper,
  Stack,
  Box,
  Typography,
  Link as MuiLink,
  Divider,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

export default function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState({
    name: '',
    username: '',
    email: '',
    about: '',
    isAdmin: false,
  });

  // Fetch user info
  const fetchUser = async () => {
    try {
      const res = await axios.get(`/api/user/profile/${id}`);
      const data = res.data.user;
      setUser({
        name: data.name,
        username: data.username,
        email: data.email,
        about: data.about,
        isAdmin: data.isAdmin,
      });
    } catch (err) {
      console.error('Failed to fetch user:', err.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  const sanitizedAbout = DOMPurify.sanitize(user.about);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, backgroundColor: 'rgba(0,0,0,0.05)' }}>
        <Stack spacing={3}>
          {/* User Basic Info */}
          <Stack spacing={1}>
            <Typography variant="h5" fontWeight="bold">
              {user.name} {user.isAdmin && '(Admin)'}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Username: {user.username}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Email: {user.email}
            </Typography>
          </Stack>

          {/* About Section */}
          {user.about && (
            <Box>
              <Typography variant="body1" fontWeight="bold" mb={1}>
                About
              </Typography>
              <Typography
                variant="body2"
                component="div"
                dangerouslySetInnerHTML={{ __html: sanitizedAbout }}
                sx={{
                  backgroundColor: 'rgba(0,0,0,0.02)',
                  p: 2,
                  borderRadius: 2,
                }}
              />
            </Box>
          )}

          <Divider />

          {/* Admin Actions */}
          {user.isAdmin ? (
            <Stack spacing={3}>
              {/* Projects */}
              <Stack spacing={1}>
                <Typography fontWeight="bold">Projects</Typography>
                <Stack direction="row" spacing={2} flexWrap="wrap">
                  <ActionButton to="/new" icon={<AddIcon fontSize="large" />} text="Add Project" />
                  <ActionButton to="/adminpanel" icon={<AdminPanelSettingsIcon fontSize="large" />} text="Admin Panel" />
                </Stack>
              </Stack>

              {/* My Blog */}
              <Stack spacing={1}>
                <Typography fontWeight="bold">My Blog</Typography>
                <Stack direction="row" spacing={2} flexWrap="wrap">
                  <ActionButton to="/new-note" icon={<CreateIcon fontSize="large" />} text="Add Note" />
                  <ActionButton to="/adminpanel-notes" icon={<AdminPanelSettingsIcon fontSize="large" />} text="Notes Panel" />
                </Stack>
              </Stack>

              {/* Profile Management */}
              <Stack spacing={1}>
                <Typography fontWeight="bold">Profile Management</Typography>
                <Stack direction="row" spacing={2} flexWrap="wrap">
                  <ActionButton to="/user/update" icon={<ManageAccountsIcon fontSize="large" />} text="Update Profile" />
                </Stack>
              </Stack>
            </Stack>
          ) : (
            <Typography variant="body1" color="text.secondary">
              Admin Privileges: None
            </Typography>
          )}
        </Stack>
      </Paper>
    </Container>
  );
}

// Reusable Action Button Component
function ActionButton({ to, icon, text }) {
  return (
    <MuiLink component={Link} to={to} underline="none">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0.5,
          p: 1.5,
          borderRadius: 2,
          boxShadow: 1,
          cursor: 'pointer',
          transition: '0.2s',
          '&:hover': {
            boxShadow: 3,
            backgroundColor: 'rgba(0,0,0,0.05)',
          },
        }}
      >
        {icon}
        <Typography variant="body2">{text}</Typography>
      </Box>
    </MuiLink>
  );
}



