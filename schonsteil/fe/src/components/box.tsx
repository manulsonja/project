import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const roundToDeciKMs = (meters) => {
  const kms = meters/1000;
  const formatted = kms.toFixed(1);
  return formatted;
}
const format_duration = (duration) => {
	if ((!duration || duration.length === 0) ) return;

  const time_array = duration.split(':');
  let return_string = "";
  console.log(time_array[0])

  if(!(time_array[0]=='00')) return_string+=time_array[0]+"Tage";
  if(!(time_array[1]=='00')) return_string+=time_array[1]+"h";
  if(!(time_array[2]=='00')) return_string+=time_array[2]+"m";

  return return_string;

};

export default function InfoBox(props) {
  const { data } = props;
  return (
    <Box sx={{ width: '100%', backgroundColor: '', padding: '10px 10px 10px' }}>
            <h3>Tourdaten</h3>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={4}>
          <Item>Distanz<h1>{roundToDeciKMs(data.posts.distance)}km</h1></Item>
        </Grid>
        <Grid item xs={4}>
          <Item>Hohenmeter<h1>12000m</h1></Item>
        </Grid>
        <Grid item xs={4}>
          <Item>Zeitbedarf<h1>{format_duration(data.posts.tour_duration)}</h1></Item>
        </Grid>
      
      </Grid>
    </Box>
  );
}