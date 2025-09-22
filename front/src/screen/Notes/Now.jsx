import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

//mui
import { Container, Box, Card, CardContent, Button, Typography, Link as MuiLink, Tooltip } from "@mui/material";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

//components
import CircularIndeterminate from "../../components/Spinner";
import Meta from "../../components/Meta";

export default function Now() {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);

    const fetching = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(`/api/note/`);
            setData(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetching();
    }, []);

    const grid = {
        display: 'grid',
        gap: 3,
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
    };

    return (
        <>
            <Box sx={{ pt: 3, backgroundColor: 'rgba(0,0,0,0.05)', minHeight: '100vh' }}>
                <Meta title="My Blog" description="Tech related posts" />

                <Container sx={{ mb: 3 }}>
                    <Link to="/">
                        <Button variant="outlined">Go Back</Button>
                    </Link>
                </Container>

                <Container>
                    {isLoading ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                            <CircularIndeterminate />
                            <Typography>Loading, please wait!</Typography>
                        </Box>
                    ) : (
                        <Box sx={grid}>
                            {data.slice().reverse().map((note) => (
                                <Card key={note._id} sx={{ p: 2, boxShadow: 3, borderRadius: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <CardContent sx={{ p: 0 }}>
                                        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                                            {note.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            mb: 1
                                        }}>
                                            {note.about}
                                        </Typography>
                                    </CardContent>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                                        <Tooltip title="Read article">
                                            <MuiLink component={Link} to={`/note/${note._id}`} underline="none">
                                                <Button variant="contained" size="small" startIcon={<AutoStoriesIcon />}>
                                                    Read
                                                </Button>
                                            </MuiLink>
                                        </Tooltip>
                                        <Typography variant="caption" color="text.secondary">
                                            Posted: {note.createdAt.slice(0, 10)}
                                        </Typography>
                                    </Box>
                                </Card>
                            ))}
                        </Box>
                    )}
                </Container>
            </Box>
        </>
    );
}
