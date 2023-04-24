import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { MEDIA_URL } from '../SETTINGS';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import "@fontsource/raleway";
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import LPNewestTours from '../components/LP/LPtours.tsx';
import Picker from '../components/Picker.tsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

	ArticleText: {
		padding: '5px',	
    textAlign: 'center',
    Link: {
      color:'black',
    }
	},
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
      <CssBaseline />
      <Container maxWidth="xl" style={{marginTop:'20px', marginBottom: '30px'}}>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
        <Link to={'/article/'+featureArticle.slug}>
            <img src={MEDIA_URL + featureArticle.image.ratios['16/9'].sources['image/jpeg']['800']} style={{width:"100%"}}/> 
            </Link>

            <div className={classes.ArticleText}>
            <Typography variant='h1'>{featureArticle.title}</Typography>
            <Typography>
            {featureArticle.subtitle}
            </Typography>
            </div>

        </Grid>
         <Grid item xs={12} md={5}>
            <Picker/>

        </Grid>
      
      </Grid>
    </Box>

      </Container>   
          <div style={{ float:'left', padding:'60px', backgroundColor:'black', width:'100%'}}>   
                 <LPNewestTours props={newestTours}/>
          </div>


          <div style={{ float:'left', padding:'60px', backgroundColor:'white', width:'100%'}}>   
                 <LPNewestTours props={currentTours}/>
          </div>    
          
    </React.Fragment>
  );
}