import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { roundToDeciKMs, format_duration } from '../utils/formatting';
import { API_URL } from '../SETTINGS';
import { useState, useEffect } from 'react';
import axiosInstance from '../axios';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function HutList(props) {

	const [appState, setAppState] = useState({
		loading: false,
		posts: null,
	});

	useEffect(() => {
        const url = API_URL + 'huette'
		axiosInstance.get(url).then((res) => {
			const allPosts = res.data;
			setAppState({ ...appState,loading: false, posts: allPosts });
		});
	}, []);

if ((!appState.posts || appState.posts.length === 0) ) return <p>Bergrettung kann nicht ausruecken.</p>;

  return (
    
   appState.posts.map((huette) => {
        console.log(huette);
        return (
          
            <Box sx={{ width: '100%', backgroundColor: '', padding: '10px 10px 10px' }}>
            <h3>Tourdaten</h3>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={4}>
          <Item>{huette.name}</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>{huette.id}</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>{huette.text}</Item>
        </Grid>    
      </Grid>
    </Box>
  
        )
    })
   
  );
}