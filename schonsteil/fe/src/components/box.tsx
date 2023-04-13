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

export default function InfoBox(props) {
  const { data } = props;
  return (
    <Box sx={{ width: '100%', backgroundColor: '', padding: '10px 10px 10px' }}>
            <h3>Tourdaten</h3>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={4}>
          <Item>Distanz<h1>{data.posts.distance}</h1></Item>
        </Grid>
        <Grid item xs={4}>
          <Item>Hohenmeter<h1>12000m</h1></Item>
        </Grid>
        <Grid item xs={4}>
          <Item>Zeitbedarf<h1>{data.posts.tour_duration}</h1></Item>
        </Grid>
      
      </Grid>
    </Box>
  );
}