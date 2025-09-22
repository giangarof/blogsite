// React
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";

// MUI
import {
  Box,
  Card,
  Button,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Link as MuiLink,
  Chip,
  Stack
} from "@mui/material";

// Dependencies
import axios from "axios";

// Components
import CopyLink from '../../components/CopyLink';
import CircularIndeterminate from '../../components/Spinner';
import Meta from '../../components/Meta';
import Message from '../../components/Message';

export default function PostDetail() {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchPost = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`/api/post/${id}`);
      setPost(data);
    } catch (err) {
      console.error('Failed to fetch post:', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePost = () => navigate(`/post/update/${id}`);
  const handleGoBack = () => window.history.back();

  useEffect(() => {
    const adminStatus = JSON.parse(localStorage.getItem('isAdmin'));
    setIsAdmin(adminStatus);
    fetchPost();
  }, [id]);

  if (isLoading) {
    return (
      <Container sx={{ mt: 3, textAlign: 'center' }}>
        <CircularIndeterminate size={90} />
        <Typography mt={2}>Loading... Please wait</Typography>
      </Container>
    );
  }

  if (!post) {
    return (
      <Container sx={{ mt: 3, textAlign: 'center' }}>
        <Message severity="error">Post not found</Message>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 3 }}>
      <Button variant="outlined" onClick={handleGoBack} sx={{ mb: 2 }}>
        Go Back
      </Button>
      <Message />
      <Meta title={post.title} description={post.description} />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Card
          sx={{
            width: { xs: '95%', sm: '80%', md: '70%' },
            mt: 2,
            mb: 2,
            boxShadow: 3,
          }}
        >
          {/* Full image visible on all devices */}
          {post.image?.[0]?.url && (
            <CardMedia
              component="img"
              image={post.image[0].url}
              alt={post.title}
              sx={{
                width: '100%',
                height: 'auto',  // keeps natural aspect ratio
                maxHeight: '80vh', // optional: prevent extremely tall images
                objectFit: 'contain', // ensures entire image is visible
              }}
            />
          )}

          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              backgroundColor: 'rgba(0,0,0,0.08)',
            }}
          >
            <Typography variant="h5">{post.title}</Typography>
            <Typography variant="body1">{post.description}</Typography>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {post.repo && (
                <MuiLink
                  href={post.repo}
                  target="_blank"
                  rel="noopener"
                  underline="hover"
                >
                  Github Code
                </MuiLink>
              )}
              {post.link && (
                <MuiLink
                  href={post.link}
                  target="_blank"
                  rel="noopener"
                  underline="hover"
                >
                  Full Project
                </MuiLink>
              )}
            </Box>

            {/* Technologies as Pills */}
            {post.tech && (
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {post.tech.split(',').map((techItem, index) => (
                  <Chip
                    key={index}
                    label={techItem.trim()}
                    color="primary"
                    size="small"
                  />
                ))}
              </Stack>
            )}

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 1 }}>
              {isAdmin && (
                <Button variant="contained" onClick={handleUpdatePost}>
                  Options
                </Button>
              )}
              <CopyLink />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

