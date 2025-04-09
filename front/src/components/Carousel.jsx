import React, { useState, useEffect } from 'react';
import { Box, IconButton, Typography, Stack, CardMedia, Container } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import axios from 'axios';

import CircularIndeterminate from "../components/Spinner";

import '../App.css'

export default function Carousel() {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState([]);

  const fetch = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`/api/post/`);
      const data = res.data;
      const format = data.map(x => ({ ...x }));
      setPost(format.slice(-4).reverse());
    } catch (err) {
      console.error('Failed to fetch posts:', err);
      setLoading(false)
    } finally{
      setLoading(false)
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
  }, [post.length]);

  return (
    <>
      {loading ? (
        <>
          <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', gap:'1rem', mb:4}}>
            <CircularIndeterminate />
            <Typography sx={{color:'#fff'}}>Loading Carousel, please wait!</Typography>
          </Box>
        </>
      ) : (
        <>
          <Box className='carousel-container'>
            <Typography sx={{textAlign:'center', color:'#fff', mb:2}} variant='h4'>Latest Projects</Typography>
            <Box className='carousel-track' id='slider'>
              {post.map((x, index) => (
                <Box className='carousel-card' key={x._id}>
                  <img
                    src={x.image[0].url}
                    alt={`slide-${index}`}
                    className='carousel-image'
                  />
                  <Box className='carousel-description'>
                    <Typography variant='subtitle1'>{x.description}</Typography>
                    <Typography component='a' href={`/post/${x._id}`} variant='subtitle1' sx={{ textDecoration: 'underline', color: 'blue' }}>Link</Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            <Box className='carousel-nav'>
              {post.map((x, index) => (
                <a
                  key={x._id}
                  href={`/post/${x._id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const slider = document.getElementById('slider');
                    slider.scrollTo({
                      left: index * slider.clientWidth,
                      behavior: 'smooth',
                    });
                  }}
                />
              ))}
            </Box>
          </Box>
        </>
      )}  


    </>
  );
}

