import React, { useState, useEffect } from 'react';
import { Box, IconButton, Typography, Stack, CardMedia, Container } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import axios from 'axios';

import '../App.css'

export default function Carousel() {
  const [post, setPost] = useState([]);

  const fetch = async () => {
    try {
      const res = await axios.get(`/api/post/`);
      const data = res.data;
      const format = data.map(x => ({ ...x }));
      setPost(format.slice(-4).reverse());
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    }
  };

  useEffect(() => {
    fetch()
    const slider = document.getElementById('slider');
    const slides = slider.querySelectorAll('img');
    let index = 0;
  
    const interval = setInterval(() => {
      index = (index + 1) % slides.length;
      slider.scrollTo({
        left: slider.clientWidth * index,
        behavior: 'smooth'
      });
    }, 3000);
  
    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <>
        <Box className='container'>
  <Box className='slider-wrapper'>
    <Box className='slider' id='slider'>
      {post.map((x, index) => (
        <Box className='slide' key={x._id}>
          <img
            id={`slide-${index}`}
            src={x.image[0].url}
            sx={{ height: '40vh', width: '100%', objectFit: 'cover' }}
          />
          <Box className='description-overlay'>
            <Typography variant="h6" color="white">{x.description}</Typography>
          </Box>
        </Box>
      ))}
    </Box>

    <Box className='slider-nav'>
      {post.map((x, index) => (
        <a key={x._id} href={`/post/${x._id}`}></a>
      ))}
    </Box>
  </Box>
</Box>

    </>
  );
}

