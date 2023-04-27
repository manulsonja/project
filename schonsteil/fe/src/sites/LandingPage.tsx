import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axios';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import Tours from '../components/Tours.tsx';
import Picker from '../components/Picker.tsx';
import { makeStyles } from '@material-ui/core/styles';
import { MEDIA_URL } from '../SETTINGS';

const useStyles = makeStyles((theme) => ({
}));

export default function Landing() {
  const classes = useStyles()

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
		let url = "/layout-widgets/manual-content/";
		axiosInstance.get(url).then((res) => {
			const allPosts  = res.data ? res.data : null;
			setAppState({ ...appState,loading: false, posts: allPosts });
		});
    let urltwo = "/layout-widgets/newest-tours/"
    axiosInstance.get(urltwo).then((res) => {
			const allPosts = res.data;
			setNewestTours({ ...newestTours,loading: false, posts: allPosts });
		});
    let urlthree = "/layout-widgets/current-tours/"
    axiosInstance.get(urlthree).then((res) => {
			const allPosts = res.data;
			setCurrentTours({ ...currentTours,loading: false, posts: allPosts });
		});

	}, []);

  if (!appState.posts || !appState.posts[0].primary_feature_article_pk) return;
  let featureArticle = appState.posts[0].primary_feature_article_pk
  
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
                  <Picker/>
              </Grid> 
          </Grid>
        </Box>
      </Container>
          <Tours props={newestTours}/>
          <Tours props={currentTours}/>
    </React.Fragment>
  );
}