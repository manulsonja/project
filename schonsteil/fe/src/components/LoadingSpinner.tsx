import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const LoadingSpinner = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
    <CircularProgress sx={{marginTop:'150px'}}/>
  </Box>
  )
}

export default LoadingSpinner