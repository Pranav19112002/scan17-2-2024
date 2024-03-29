// ViewScanning.jsx

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Grid, Modal, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Editscanning from './Editscanning';
import './Viewscanning.css';
import axios from 'axios';
import Adsidebar from '../Navbar/Adsidebar';
import Adnavbar from '../Navbar/Adnavbar';
import Loader from '../Loader';
import EditIcon from '@mui/icons-material/Edit';
import Error from '../Error';
import Success from '../Success';


function ViewScanning() {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [selectedScanId, setSelectedScanId] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);



  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3500/scans/getallscans');
      setScans(response.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch scans');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditScan = (scanId) => {
    setVisible(true);
    setSelectedScanId(scanId);
  };

  const handleModalCancel = () => {
    setVisible(false);
    setSelectedScanId('');
  };

  const handleActivateScan = async (scanId) => {
    try {
      setLoading(true);
      await axios.put(`http://localhost:3500/scans/activate/${scanId}`);
      fetchData();
      setLoading(false);
      setSuccess('Scan Activated Successfully');
    } catch (error) {
      console.error(error);
      setError('Failed to Activate');
      setLoading(false);
      setSuccess(null);
    }
  };

  const handleDeactivateScan = async (scanId) => {
    try {
      setLoading(true);
      await axios.put(`http://localhost:3500/scans/deactivate/${scanId}`);
      fetchData();
      setLoading(false);
      setSuccess('Scan Deactivated Successfully');
    } catch (error) {
      console.error(error);
      setError('Failed to Deactivate');
      setLoading(false);
      setSuccess(null);
    }
  };

  return (
    <div>
      {loading && <Loader/>}
      {error && <Error />}
      {success && <Success />}
      <Adnavbar/>
      <Box height={20}>
        <Box sx={{ display: 'flex' }}>
          <Adsidebar/>
          <Grid className='grid-container'>
            <Paper elevation={10} className='paperstyle'>
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Typography variant="h4" sx={{ fontFamily: 'cursive', color: 'rebeccapurple' }}> Scannings</Typography>
                <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ color: 'white' }}>Scanning ID</TableCell>
                        <TableCell style={{ color: 'white' }}>Scanning Name</TableCell>
                        <TableCell style={{ color: 'white' }}>Scanning Type</TableCell>
                        <TableCell style={{ color: 'white' }}>Description</TableCell>
                        <TableCell style={{ color: 'white' }}>Amount</TableCell>
                        <TableCell style={{ color: 'white' }}>STATUS</TableCell>
                        <TableCell style={{ color: 'white' }}>EDIT</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {scans.map((value, index) => (
                        <TableRow key={index}>
                          <TableCell style={{ color: 'greenyellow' }}>{value.sid}</TableCell>
                          <TableCell style={{ color: 'greenyellow' }}>{value.sname}</TableCell>
                          <TableCell style={{ color: 'greenyellow' }}>{value.stype}</TableCell>
                          <TableCell style={{ color: 'greenyellow' }}>{value.sdescription}</TableCell>
                          <TableCell style={{ color: 'greenyellow' }}>{value.samount}</TableCell>
                          <TableCell >
                            {value.display ? (
                              <Button
                                className='deactivate-button'
                                onClick={() => handleDeactivateScan(value._id)}
                                sx={{color:'white',backgroundColor:'red'}}
                                variant='conatined'
                              >
                                Deactivate
                              </Button>
                            ) : (
                              <Button
                                className='activate-button'
                                onClick={() => handleActivateScan(value._id)}
                                sx={{color:'white',backgroundColor:'green'}}
                                variant='conatined'
                              >
                                Activate
                              </Button>
                            )}
                          </TableCell>
                          <TableCell style={{ color: 'white' }}>
                            <EditIcon onClick={() => handleEditScan(value._id)} sx={{color:'rebeccapurple'}}></EditIcon>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
               
                <Modal
                  title='Edit Scan'
                  open={visible} 
                  onCancel={handleModalCancel}
                  footer={null}
                >
                  <Editscanning scanId={selectedScanId} />
                </Modal>
              </Box>
            </Paper>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}

export default ViewScanning;


// tablecellil edit nte icon kodukan it is kept empty do it also in the scan type view