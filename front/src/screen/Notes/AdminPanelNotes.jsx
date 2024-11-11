//react
import React, { useState, useEffect } from "react";

//dependencies
import axios from "axios"

//mui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Link as A, Box, Typography } from "@mui/material";

//components
import DeleteNote from "../../components/DeleteNote";
import CircularIndeterminate from "../../components/Spinner";


export default function AdminPanel() {
    const [isLoading, setIsLoading] = useState(false)
    const [post, setPost] = useState([])
    
    // first way
    const fetchPosts = async() =>{
        setIsLoading(true)
        try {
            const data = await axios.get('/api/note')
            const res = data
            // console.log(res.data)
            setPost(res.data)
            
            return res.data
            
        } catch (err) {
            console.log('something went wrong: ', err.message)
        } finally{
            setIsLoading(false)
        }
      }
      
    useEffect(() => {
        fetchPosts()
    }, [])

    const box = {
        // color: '#fff',
        textDecoration: 'none',
        '&:hover':{
            textDecoration: 'underline',
            // color: '#fff'
        },
        cursor:'pointer',
        whiteSpace:'nowrap', 
        overflow:'hidden', 
        textOverflow:'ellipsis',
        maxWidth: '250px'
    }



  return (
    <>
        {/* remember to create a new ctrl - 'maybe' */}
        {/* table to show all the posts */}
        {/* id, description, link to post itself, link to repo, see more, delete */}
        {isLoading ? <CircularIndeterminate/> : (

            <TableContainer >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Posted</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Note</TableCell>
                            <TableCell>Update</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {post.length === 0 ?
                            <Box sx={{margin:'2rem 0px 0px 2rem'}}>
                                <Typography>
                                    No notes yet ...
                                </Typography>
                                <A href={`/new-note`}>Create one</A>
                            </Box> : (
                                <>
                                    {post.slice().reverse().map(p =>(
                                        <TableRow key={p._id}>
                                            <TableCell>{p._id.substr(-4)}</TableCell>
                                            <TableCell>{p.createdAt.substr(0,10)}</TableCell>
                                            <TableCell>{p.title}</TableCell>
                                            <TableCell><A sx={box} href={`/note/${p._id}`} target="_blank">Link Note</A></TableCell>
                                            <TableCell> <A sx={box} href={`/note/update/${p._id}`}>Update Form</A></TableCell>
                                            <TableCell>
                                                <DeleteNote postId={p._id} refetch={fetchPosts}/>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                
                                </>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        )}
    </>
  )
}