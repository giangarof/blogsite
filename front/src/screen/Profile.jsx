import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios';

export default function Profile() {
  const {id} = useParams();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [isAdmin, setIsAdmin] = useState(Boolean)
  
  const fetchUser = async() => {
    const res = await axios.get(`/api/user/profile/${id}`);
    console.log(res)
    setName(res.data.user.name);
    setUsername(res.data.user.username);
    setEmail(res.data.user.email);
    setIsAdmin(res.data.user.isAdmin)
    // console.log(res)
    return res;
  }
  
  useEffect(() => {
    // const isAdmin = localStorage.getItem('isAdmin')
    // setIsAdmin(isAdmin)

    fetchUser()
  }, [id])
    
  return (
    <>
    {/* Profile */}
      <div>
        <h2>{name}</h2>
        <h3>{email}</h3>
        <h3>{username}</h3>
        {isAdmin === true ? (
          <h3>Admin</h3> 
        ) : (
          <h3>No Admin</h3>

        )
          }
      </div>      
      
    </>
  )
}
