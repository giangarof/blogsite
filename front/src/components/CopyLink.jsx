import { useState } from "react";
import { Snackbar, SnackbarContent, Tooltip, Button, Typography } from "@mui/material";
export default function CopyLink(){
    const [open, setOpen]= useState(false)

    const clip = async () => {
        const link = window.location.href
        navigator.clipboard.writeText(link)
        setOpen(true)
        setTimeout(() => {
            setOpen(false);
          }, 5000)
        
    }

    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
          }
          setOpen(false);
    }

    const popup = {
        backgroundColor:'green'
      }

    return <>
            <Tooltip title="Copy Link">
                <Button variant='contained' color='success' onClick={clip}>
                    <Typography color='white'>Copy Link</Typography>
                </Button>
            </Tooltip>
                                            
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                <SnackbarContent sx={popup} message="Link copied"/>
            </Snackbar>
    </>
}