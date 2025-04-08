//react
import React, { useState, useEffect } from "react";
import axios from "axios"

//mui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Link as A } from "@mui/material";

//components
import DeletePost from "../../components/DeletePost";
import CircularIndeterminate from "../../components/Spinner";
import Message from '../../components/Message'


export default function AdminPanel() {
    const [isLoading, setIsLoading] = useState(false)
    const [post, setPost] = useState([])
    
    // first way
    const fetchPosts = async() =>{
        setIsLoading(true)
        try {
            const data = await axios.get('/api/post')
            const res = data
            // console.log(res.data)
            setPost(res.data)
            
            return res.data
            
        } catch (err) {
            console.log('something went wrong: ', err.message)
        }finally {
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
        {isLoading ? <CircularIndeterminate /> : 
            <>
                <Message/>
                <TableContainer >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Posted</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Full Project</TableCell>
                                <TableCell>Repository</TableCell>
                                <TableCell>Update Form</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {post.slice().reverse().map(p =>(
                                <TableRow key={p._id}>
                                    <TableCell>{p._id.substr(-4)}</TableCell>
                                    <TableCell>{p.createdAt.substr(0,10)}</TableCell>
                                    <TableCell>{p.title}</TableCell>
                                    <TableCell><A sx={box} href={p.link} target="_blank">Full Project</A></TableCell>
                                    <TableCell><A sx={box} href={p.repo} target="_blank">Github Code</A></TableCell>
                                    <TableCell><A sx={box} href={`/post/update/${p._id}`}>Update Post Form</A></TableCell>
                                    <TableCell>
                                        <DeletePost postId={p._id} refetch={fetchPosts}/>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        }
    </>
  )
}