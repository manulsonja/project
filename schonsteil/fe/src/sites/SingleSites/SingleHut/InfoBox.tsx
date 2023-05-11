import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import ContactDialoge from './ContactDialoge.tsx';
import { useState } from 'react';
import CallIcon from '@mui/icons-material/Call';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function InfoBox({data}) {
  const [dialogeOpen, setDialogeOpen] = useState(false)
	const handleClose = () => {setDialogeOpen(false)}

  return (
    <Box sx={{ width: '100%', backgroundColor: '', padding: '10px 10px 10px' }}>
      <ContactDialoge open={dialogeOpen} close={handleClose} data={data}/>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={4}>
          <Item>Hoehe<h1>{data.altitude}m</h1></Item>
        </Grid>
        <Grid item xs={4}>
          <Item>Uebernachtung<h1>{(data.overnight? 'Ja': 'Nein')}</h1></Item>
        </Grid>
        <Grid item xs={4}>
          <Item>Kontakt<br/><CallIcon fontSize='large' onClick={() => {setDialogeOpen(true)}}/></Item>
        </Grid>     
      </Grid>
    </Box>
  );
}