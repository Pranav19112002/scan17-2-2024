import React from 'react'
import Layout from '../components/Layout'
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import EmailIcon from '@mui/icons-material/Email';
const Contact = () => {
  return (
    <div>
      <Layout>
      <Box sx={{my :5 ,ml :10, "& h4":{fontWeight: "bold",mb : 2}}}>
        <Typography variant='h4' >Contact Us</Typography>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, dolorum odit! Repellendus incidunt at nisi inventore maiores,
           ex totam consectetur similique atque rerum nobis dolorum voluptatem iure ad numquam error!</p>
      </Box>
      <Box sx={{m: 3,ml :10,width: "600px"}}>
        <TableContainer component={Paper}>
          <Table area-label=" Contact Us">
            <TableHead>
              <TableRow>
                <TableCell sx={{backgroundColor:"black",color:"white"}} align='center'>Contact Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <SupportAgentIcon sx={{color:"red",pt : 1}}/> +91 8208282678
                </TableCell>
              </TableRow>
              <TableRow>
              <TableCell>
                  <EmailIcon sx={{color:"blue",pt : 1}}/> pvcentre@gmail.com
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      </Layout>
      </div>
  )
}

export default Contact