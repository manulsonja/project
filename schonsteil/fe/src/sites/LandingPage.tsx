import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axios';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import Tours from './ListViews/Tiles/Tours.tsx';
import { MEDIA_URL } from '../SETTINGS';
import NavButtons from '../components/NavButtons.tsx';

export default function Landing() {

  const [appState, setAppState] = useState({
		posts: null,
	});
  const [newestTours, setNewestTours] = useState({
		posts: null,
	});
  const [currentTours, setCurrentTours] = useState({
		posts: null,
	});
 
	useEffect(() => {
		const url = "/layout-widgets/manual-content/";
		axiosInstance.get(url).then((res) => {
			const allPosts  = res.data ? res.data : null;
			setAppState({ ...appState,loading: false, posts: allPosts });
		});
    const urltwo = "/layout-widgets/newest-tours/"
    axiosInstance.get(urltwo).then((res) => {
			const allPosts = res.data;
			setNewestTours({ ...newestTours,loading: false, posts: allPosts });
		});
    const urlthree = "/layout-widgets/current-tours/"
    axiosInstance.get(urlthree).then((res) => {
			const allPosts = res.data;
			setCurrentTours({ ...currentTours,loading: false, posts: allPosts });
		});

	}, []);

  if (!appState.posts || !appState.posts[0].primary_feature_article_pk) return;
  const featureArticle = appState.posts[0].primary_feature_article_pk
  
  return (
    <React.Fragment>
      <Container maxWidth="xl" style={{marginTop:'20px', marginBottom: '30px'}}>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7} >
        <Link to={'/article/'+featureArticle.slug}>
            <img src={MEDIA_URL + featureArticle.image.ratios['16/9'].sources['image/jpeg']['800']} style={{width:"100%"}}/> 
            </Link>
            <Typography align="center" variant='h1' sx={{ m: '10px' }} >{featureArticle.title}</Typography>
            <Typography align="center" sx={{ m: '10px' }} >
            {featureArticle.subtitle}
            </Typography>
            </Grid>
              <Grid item xs={12} md={5}>
                  <NavButtons/>
              </Grid> 
          </Grid>
        </Box>
      </Container>
          <Tours props={newestTours}/>
          <Tours props={currentTours}/>
    </React.Fragment>
  );
}