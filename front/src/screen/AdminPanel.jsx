import React, { useState, useEffect } from "react";
import axios from "axios"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Link as A } from "@mui/material";
import DeletePost from "../components/DeletePost";


export default function AdminPanel() {
    const [post, setPost] = useState([])
    
    // first way
    const fetchPosts = async() =>{
        try {
            const data = await axios.get('/api/post')
            const res = data
            console.log(res.data)
            setPost(res.data)
            
            return res.data
            
        } catch (err) {
            console.log('something went wrong: ', err.message)
        }
      }
      
    useEffect(() => {
        fetchPosts()
    }, [])

    const box = {
        color: '#fff',
        textDecoration: 'none',
        '&:hover':{
            textDecoration: 'underline',
            color: '#fff'
        },
        cursor:'pointer',
        whiteSpace:'nowrap', 
        overflow:'hidden', 
        textOverflow:'ellipsis',
        maxWidth: '150px'
    }



  return (
    <>
        {/* remember to create a new ctrl - 'maybe' */}
        {/* table to show all the posts */}
        {/* id, description, link to post itself, link to repo, see more, delete */}
        
        <TableContainer >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Posted</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Full Project</TableCell>
                        <TableCell>Repository</TableCell>
                        <TableCell>Update Form</TableCell>
                        <TableCell>Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {post.map(p =>(
                        <TableRow key={p._id}>
                            <TableCell sx={{color:'#fff'}}>{p._id}</TableCell>
                            <TableCell sx={{color:'#fff'}}>{p.createdAt}</TableCell>
                            <TableCell sx={{color:'#fff'}}>{p.description}</TableCell>
                            <TableCell><A sx={box} href={p.link}>Full Project</A></TableCell>
                            <TableCell><A sx={box} href={p.repo}>Github Code</A></TableCell>
                            <TableCell><A sx={box} href={`/post/update/${p._id}`}>Update Post Form</A></TableCell>
                            <TableCell>
                                <DeletePost postId={p._id}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>
  )
}