import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios';

export default function Profile() {
  const {id} = useParams();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')

  const fetchUser = async() => {
    const res = await axios.get(`/api/user/profile/${id}`);
    console.log(res)
    setName(res.data.user.name);
    setUsername(res.data.user.username);
    setEmail(res.data.user.email);
    return res;
  }

  useEffect(() => {
    fetchUser()
  }, [id])
    
  return (
    <>
    {/* Profile */}
      <div>
        <h2>{name}</h2>
        <h3>{email}</h3>
        <h3>{username}</h3>
      </div>

      {/* component which will render a list of all posts */}
      
      
    </>
  )
}
