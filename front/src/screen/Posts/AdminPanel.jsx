import React, { useState, useEffect } from "react";
import axios from "axios";

//mui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { Link as MuiLink, IconButton, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import LaunchIcon from '@mui/icons-material/Launch';

//components
import DeletePost from "../../components/DeletePost";
import CircularIndeterminate from "../../components/Spinner";
import Message from '../../components/Message';

export default function AdminPanel() {
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState([]);
  
  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get('/api/post');
      setPost(data);
      return data;
    } catch (err) {
      console.log('something went wrong: ', err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  const linkStyle = {
    textDecoration: 'none',
    color: 'primary.main',
    '&:hover': {
      textDecoration: 'underline',
    },
    maxWidth: 250,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'inline-block',
  };

  return (
    <>
      {isLoading ? <CircularIndeterminate /> : 
        <>
          <Message />
          <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 3 }}>
            <Table>
              <TableHead sx={{ backgroundColor: 'rgba(0,0,0,0.05)' }}>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Posted</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Full Project</TableCell>
                  <TableCell>Repository</TableCell>
                  <TableCell align="center">Update</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {post
                  .slice()
                  .reverse()
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(p => (
                    <TableRow key={p._id} hover>
                      <TableCell>{p._id.substr(-4)}</TableCell>
                      <TableCell>{p.createdAt.substr(0,10)}</TableCell>
                      <TableCell sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {p.title}
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Open Full Project">
                          <MuiLink sx={linkStyle} href={p.link} target="_blank">
                            <LaunchIcon fontSize="small" sx={{ mr: 0.5 }} /> Open
                          </MuiLink>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Open Repository">
                          <MuiLink sx={linkStyle} href={p.repo} target="_blank">
                            <LaunchIcon fontSize="small" sx={{ mr: 0.5 }} /> Github
                          </MuiLink>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="Edit Post">
                          <IconButton component={MuiLink} href={`/post/update/${p._id}`} color="primary">
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="center">
                        <DeletePost postId={p._id} refetch={fetchPosts} />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={post.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 20, 50]}
            />
          </TableContainer>
        </>
      }
    </>
  );
}

