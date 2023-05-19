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
import { makeStyles } from '@material-ui/core';
import LoadingSpinner from '../components/LoadingSpinner.tsx';

const useStyles = makeStyles((theme) => ({
	sectionTwo: {
      padding: '20px  0px 20px',
      float: 'left',
      width: '100%',
	},
  sectionThree: {
    padding: '20px  0px 20px',
    float: 'left',
    width: '100%',
  },

}));

export default function Landing() {
  const classes = useStyles()
  const [appState, setAppState] = useState({
		posts: null,
    loading: true,
	});
  const [newestTours, setNewestTours] = useState({
		posts: null,
    loading: true,
	});
  const [currentTours, setCurrentTours] = useState({
		posts: null,
    loading: true,
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
  console.log(appState.posts)
  if (!appState.posts || appState.posts.length==0) return;
  console.log()
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
           
              {(appState.loading? <LoadingSpinner/> : 

              <React.Fragment>
              <Typography align="center" variant='h1' sx={{ m: '10px' }} > {featureArticle.title}</Typography>
              
            <Typography align="center" sx={{ m: '10px' }} >
              {featureArticle.subtitle}{'   '}
              <Link to={'/article/'+featureArticle.slug}>
              Weiterlesen... 
            </Link>
            </Typography>
            </React.Fragment>
            )}


            </Grid>
              <Grid item xs={12} md={5}>
                  <NavButtons/>
              
              </Grid> 
          </Grid>
        </Box>
      </Container>
    {(newestTours.loading? <LoadingSpinner/> : 
    <div className={classes.sectionTwo}>
      <Tours props={newestTours}/>
    </div>
    )}
     {(currentTours.loading? <LoadingSpinner/> : 

    <div className={classes.sectionThree}>
    <Tours props={currentTours}/>
    </div>
     )}
    </React.Fragment>
  );
}