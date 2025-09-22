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
import DeleteNote from "../../components/DeleteNote";
import CircularIndeterminate from "../../components/Spinner";

export default function AdminPanelNotes() {
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState([]);

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchNotes = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get('/api/note');
      setNotes(data);
      return data;
    } catch (err) {
      console.error('Failed to fetch notes:', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'primary.main',
    '&:hover': { textDecoration: 'underline' },
    maxWidth: 250,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'inline-block',
  };

  return (
    <>
      {isLoading ? <CircularIndeterminate /> : (
        <>
          {notes.length === 0 ? (
            <Paper sx={{ p: 3, mt: 2 }}>
              <p>No notes yet...</p>
              <MuiLink href="/new-note">Create one</MuiLink>
            </Paper>
          ) : (
            <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 3 }}>
              <Table>
                <TableHead sx={{ backgroundColor: 'rgba(0,0,0,0.05)' }}>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Posted</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Note</TableCell>
                    <TableCell align="center">Update</TableCell>
                    <TableCell align="center">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {notes
                    .slice()
                    .reverse()
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(note => (
                      <TableRow key={note._id} hover>
                        <TableCell>{note._id.substr(-4)}</TableCell>
                        <TableCell>{note.createdAt.substr(0, 10)}</TableCell>
                        <TableCell sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {note.title}
                        </TableCell>
                        <TableCell>
                          <Tooltip title="Open Note">
                            <MuiLink sx={linkStyle} href={`/note/${note._id}`} target="_blank">
                              <LaunchIcon fontSize="small" sx={{ mr: 0.5 }} /> Open
                            </MuiLink>
                          </Tooltip>
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title="Edit Note">
                            <IconButton component={MuiLink} href={`/note/update/${note._id}`} color="primary">
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                        <TableCell align="center">
                          <DeleteNote postId={note._id} refetch={fetchNotes} />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                count={notes.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 20, 50]}
              />
            </TableContainer>
          )}
        </>
      )}
    </>
  );
}

