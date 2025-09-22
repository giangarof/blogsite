import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, CircularProgress, Container } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import axios from 'axios';

export default function CarouselBox() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(3);

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('/api/post/');
        setPosts(res.data.slice(-6).reverse());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Handle responsive slides
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) setVisibleSlides(1); // mobile
      else if (window.innerWidth < 900) setVisibleSlides(2); // tablet
      else setVisibleSlides(3); // desktop
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % posts.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);

  // Auto-slide
  useEffect(() => {
    if (!posts.length) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [posts]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, py: 6, backgroundColor: '#000' }}>
        <CircularProgress />
        <Typography variant="h6" color="white">Loading Carousel...</Typography>
      </Box>
    );
  }

  const slideWidth = 100 / visibleSlides;

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ textAlign: 'center', mb: 4, color: 'white' }}>
        Latest Projects
      </Typography>

      <Box sx={{ position: 'relative', overflow: 'hidden',  }}>
        <Box
          sx={{
            display: 'flex',
            transition: 'transform 0.6s ease',
            transform: `translateX(-${currentIndex * slideWidth}%)`,
          }}
        >
          {posts.concat(posts).map((post, idx) => (
            <Box
              key={idx}
              sx={{
                minWidth: `${slideWidth}%`,
                p: 2,
                boxSizing: 'border-box',
              }}
            >
              <Box
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: 5,
                  backgroundColor: '#333',
                  height: 350,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box sx={{ flex: 1, overflow: 'hidden', borderRadius: 3 }}>
                  <img
                    src={post.image[0].url}
                    alt={post.description}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
                <Box sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="subtitle1" sx={{ color: 'white', mb: 1 }}>
                    {post.description}
                  </Typography>
                  <Typography
                    component="a"
                    href={`/post/${post._id}`}
                    sx={{ textDecoration: 'underline', color: '#90caf9' }}
                  >
                    View Project
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Arrows */}
        <IconButton
          onClick={prevSlide}
          sx={{
            position: 'absolute',
            top: '50%',
            left: 8,
            transform: 'translateY(-50%)',
            color: '#fff',
            bgcolor: 'rgba(0,0,0,0.3)',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' },
          }}
        >
          <ArrowBackIos />
        </IconButton>
        <IconButton
          onClick={nextSlide}
          sx={{
            position: 'absolute',
            top: '50%',
            right: 8,
            transform: 'translateY(-50%)',
            color: '#fff',
            bgcolor: 'rgba(0,0,0,0.3)',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' },
          }}
        >
          <ArrowForwardIos />
        </IconButton>
      </Box>
    </Container>
  );
}


