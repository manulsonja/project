

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { MEDIA_URL } from './SETTINGS';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import axiosInstance from './axios';
import LPNewestTours from './LP/LPtours.tsx';
import "@fontsource/raleway";




const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: "black",
    fontSize: "22px",
    fontFamily: "Raleway",
  }));
  

export default function Landing() {
  const [appState, setAppState] = useState({
		posts: null,
	});
  const [newestTours, setNewestTours] = useState({
		posts: null,
	});

	useEffect(() => {
		let url = "articles/";
		axiosInstance.get(url).then((res) => {
			const allPosts = res.data;
			setAppState({ ...appState,loading: false, posts: allPosts });
		});
    let urltwo = "newest-tours/"
    axiosInstance.get(urltwo).then((res) => {
			const allPosts = res.data;
			setNewestTours({ ...newestTours,loading: false, posts: allPosts });
		});

	}, []);

  if (!appState.posts || appState.posts.length == 0) return;

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl" style={{marginTop:'20px'}}>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <Item>
            <img src={MEDIA_URL + appState.posts[0].image.url} style={{width:"100%"}}/> 
            <h1>{appState.posts[0].title}</h1>
            <p>{appState.posts[0].subtitle}</p>

            </Item>
        </Grid>
         <Grid item xs={5}>
          <Item>xs=4</Item>
        </Grid>
      
      </Grid>
    </Box>

      </Container> 
      
      
          <div style={{ float:'left', padding:'60px', backgroundColor:'black', width:'100%'}}>   
                 <LPNewestTours props={newestTours}/>
          </div>
          <div style={{ float:'left', padding:'60px', backgroundColor:'white', width:'100%'}}>   
                 <LPNewestTours props={newestTours}/>
          </div>    <div style={{ float:'left', padding:'60px', backgroundColor:'black', width:'100%'}}>   
                 <LPNewestTours props={newestTours}/>
          </div>

    </React.Fragment>
  );
}