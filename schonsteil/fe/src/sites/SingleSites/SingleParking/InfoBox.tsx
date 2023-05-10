import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { MEDIA_URL } from '../../../SETTINGS';
import { Link } from '@material-ui/core';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const renderGMAPS = (position) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${position[0]},${position[1]}`
    return url
}
export default function InfoBox(props) {
  const { data } = props;
  console.log(data)
  return (
    <Box sx={{ width: '100%', backgroundColor: '', padding: '10px 10px 10px' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={2}>
          <Item>Untergrund<h1>{data.ground_type}</h1></Item>
        </Grid>
        <Grid item xs={2}>
          <Item>Gebuehren<h1>{data.fees}</h1></Item>
        </Grid>
        <Grid item xs={2}>
          <Item>Toilette<h1>
            {(data.toilet? 'Ja': 'Nein')}
            </h1></Item>
        </Grid> 
        <Grid item xs={2}>
          <Item>Kapazitaet<h1>{data.capacity}</h1></Item>
        </Grid> 
        <Grid item xs={2}>
          <Item>Privat/Oeffntl<h1>{data.estate}</h1></Item>
        </Grid> 
        <Grid item xs={2}>
          <Link href={renderGMAPS(data.position)}>
          <Item style={{backgroundImage: `url(${MEDIA_URL}/media/gmaps.png)`, backgroundSize: 'cover'}}>Privat/Oeffntl<h1>{data.estate}</h1></Item>

          </Link>
        </Grid>    
      </Grid>
    </Box>
  );
}