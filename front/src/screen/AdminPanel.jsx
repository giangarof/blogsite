import React, { useState, useEffect } from "react";
import axios from "axios"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

  return (
    <>
        {/* remember to create a new ctrl - 'maybe' */}
        {/* table to show all the posts */}
        {/* id, description, link to post itself, link to repo, see more, delete */}
        
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Posted</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Repo</TableCell>
                        <TableCell>Post</TableCell>
                        <TableCell>See More</TableCell>
                        <TableCell>Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {post.map(p =>(
                        <TableRow key={p._id}>
                            <TableCell>{p._id}</TableCell>
                            <TableCell>{p.createdAt}</TableCell>
                            <TableCell>{p.description}</TableCell>
                            <TableCell>Repo Link</TableCell>
                            <TableCell>Link</TableCell>
                            <TableCell>Post itself</TableCell>
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