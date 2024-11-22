import { Typography } from '@mui/material'
import React, { useState } from 'react'

export default function Message(prop) {
    const {msg} = prop
    // console.log(prop)
    // console.log(prop)

  return (
    <Typography>{msg}</Typography>
    
  )
}
