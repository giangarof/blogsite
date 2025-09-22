// React
import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';

// Components
import SearchBox from '../../components/SearchBox';
import CircularIndeterminate from "../../components/Spinner";
import Meta from "../../components/Meta";
import Message from '../../components/Message';

// MUI
import { Box, Container, Card, CardContent, CardMedia, Typography, Button, Divider, Tooltip, Stack } from "@mui/material";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

// Dependencies
import axios from "axios";

export default function Projects() {
  const { keyword } = useParams();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  // Fetch posts
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/post', { params: { keyword } });
      setPosts(data);
    } catch (err) {
      console.error('Failed to fetch posts:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [keyword]);

  const emptyStateStyle = {
    color: 'red',
    marginTop: '1rem',
    textAlign: 'center',
  };

  return (
    <Box sx={{ backgroundColor: 'rgba(0,0,0,0.05)', py: 4 }}>
      <Meta 
        title="Software development" 
        description="Projects to showcase my expertise as a software developer." 
      />

      {/* Go Back Button */}
      <Container sx={{ mb: 3 }}>
        <Button variant='outlined' component={Link} to='/'>Go Back</Button>
      </Container>

      {/* Main Content */}
      <Container>
        {loading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <CircularIndeterminate size={60} />
            <Typography>Loading projects, please wait...</Typography>
          </Box>
        ) : (
          <>
            <SearchBox />
            <Message sx={{ mt: 2 }} />

            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
              Total Projects: {posts.length}
            </Typography>

            {posts.length > 0 ? (
              <Box
                sx={{
                  display: 'grid',
                  gap: 4,
                  gridTemplateColumns: {
                    xs: '1fr',   // small screens
                    sm: '1fr',   // small tablets
                    md: 'repeat(2, 1fr)', // tablet & desktop
                  },
                }}
              >
                {posts.slice().reverse().map((item) => (
                  <Card key={item._id} sx={{ boxShadow: 3, display: 'flex', flexDirection: 'column' }}>
                    {/* Image */}
                    {item.image?.[0]?.url && (
                      <CardMedia
                        component="img"
                        image={item.image[0].url}
                        alt={item.title}
                        sx={{
                          width: '100%',
                          height: { xs: 'auto', md: '250px' },
                          objectFit: 'contain',  // ensures full image visible
                          backgroundColor: 'rgba(0,0,0,0.08)',
                        }}
                      />
                    )}

                    <Divider sx={{ backgroundColor: 'rgba(0,0,0,0.12)' }} />

                    {/* Card Content */}
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Typography variant="subtitle1" fontWeight={600}>{item.title}</Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {item.description}
                      </Typography>

                      <Stack direction="row" spacing={1} mt={1} alignItems="center">
                        <Tooltip title="Read Article">
                          <Button
                            variant="contained"
                            size="small"
                            component={Link}
                            to={`/post/${item._id}`}
                          >
                            <AutoStoriesIcon />
                          </Button>
                        </Tooltip>

                        
                        {/* Technologies as pills with ellipsis */}
                        {item.tech && (
                        <Box
                            sx={{
                            display: 'flex',
                            gap: 1,
                            overflow: 'hidden',
                            mt: 1,
                            }}
                        >
                            {(() => {
                            const techs = item.tech.split(',').map(t => t.trim());
                            const maxVisible = 3; // max pills to show before ellipsis
                            return techs.slice(0, maxVisible).map((tech, idx) => (
                                <Button
                                key={idx}
                                size="small"
                                variant="outlined"
                                sx={{ textTransform: 'none', flexShrink: 0, fontSize: '0.75rem' }}
                                >
                                {tech}
                                </Button>
                            )).concat(
                                techs.length > maxVisible ? (
                                <Button
                                    key="more"
                                    size="small"
                                    variant="outlined"
                                    sx={{ textTransform: 'none', flexShrink: 0, fontSize: '0.75rem' }}
                                >
                                    +{techs.length - maxVisible}
                                </Button>
                                ) : []
                            );
                            })()}
                        </Box>
                        )}

                      </Stack>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            ) : (
              <Typography sx={emptyStateStyle}>
                No technology found with your query.
              </Typography>
            )}
          </>
        )}
      </Container>
    </Box>
  );
}

