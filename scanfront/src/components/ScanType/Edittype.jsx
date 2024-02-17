import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Edittype.css';
import Adnavbar from '../Navbar/Adnavbar';
import Adsidebar from '../Navbar/Adsidebar';
import logcoverImage from '../Images/formcover.png';
import Error from '../Error';
import Success from '../Success';
import Loader from '../Loader';

function Edittype ({stypeId}){
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
    const [stypeDetails, setStypeDetails] = useState({
        stype: '',
       
      });
    
      useEffect(() => {
        const fetchStypeDetails = async () => {
          try {
            const response = await axios.post('http://localhost:3500/stypes/getstypebyid', {
                stypeId,
              });
    
            setStypeDetails(response.data);
          } catch (error) {
            console.error(error);
            
          }
        };
    
        fetchStypeDetails();
      }, [stypeId]); 
    
      const handleInputChange = (e) => {
        setStypeDetails({
          ...stypeDetails,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleUpdateStype = async () => {
        try {
          setLoading(true);

          await axios.put('http://localhost:3500/stypes/updatestype', {
            stypeId,
            ...stypeDetails,
          });

          setSuccess('Type updated successfully');
          setLoading(false);
        } catch (error) {
          console.error(error);
          setError('Failed to update type');
          setLoading(false);
          
        }
      };
    
  return (
     <div className="form-container1">
       {loading && <Loader />}
      {error && <Error />}
      {success && <Success />}
        <Adnavbar/>
      <Box height={20}>
        <Box sx={{ display: 'flex' }}>
            <Adsidebar/>
          <Grid className="grid-container">
            <Paper elevation={10} className="paperstyleee" style={{ backgroundImage: `url(${logcoverImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Typography variant="h4" sx={{ fontFamily: 'cursive', color: 'rebeccapurple' }}>EDITTYPES</Typography>
                <br />
                <div className="input-button-container">
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Scan Type"
                    name="stype"
                    value={stypeDetails.stype}
                    onChange={handleInputChange}
                    sx={{
                      '& input::placeholder': {
                        fontFamily: 'cursive',
                      },
                    }}
                  />
                  <Button className="button" onClick={handleUpdateStype} sx={{ backgroundColor: 'rebeccapurple', color: 'white', fontFamily:'cursive' }}>
                    EditType
                  </Button>
                </div>
              </Box>
            </Paper>
          </Grid>
        </Box>
      </Box>
    </div>
  )
}

export default Edittype;
