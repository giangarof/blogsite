import { Typography, Alert } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';

import React, { useEffect, useState } from 'react'

export default function Message() {
  const [message, setMessage] = useState('');
  // console.log(prop)
  
  useEffect(() => {
      setMessage(sessionStorage.getItem('notification'))
      setTimeout(() => {
        sessionStorage.removeItem('notification')
        setMessage(null)
      }, 3000)
    }, [message])

  return (
    <>
      {message ? (
        <Alert sx={{marginTop:'2rem'}} icon={<CheckIcon fontSize="inherit" />} severity="success"> 
          <Typography>{message}</Typography>
        </Alert>
        ) :''
      }
    </>
    
  )
}
