import { Box, Typography } from '@mui/material'
import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer = () => {
  return (
    <>
    <Box sx={{ bgcolor:"black" ,color: "white" ,p: 3, textAlign: "center"}}>
       <Box sx={{my : 3,
        "& svg": {
            fontSize:" 60px",
            cursor:"pointer",
            mr: 2,
        },
        "& svg:hover":{
            color:"rebeccapurple",
            transform:"translateX(3px)",
            transition:"all 400ms",
            
        },
        }}>
        <InstagramIcon />
        <XIcon />
        <FacebookIcon />
       </Box>
       <Typography
        variant='h6'
        sx={{ fontSize: "1rem",}}> Thank You For Visiting</Typography>
    </Box>
    </>
  )
}

export default Footer