import * as React from 'react';
import axiosInstance from '../utils/axios';
import { useState, useEffect } from 'react';
import Tours from '../components/Tours.tsx';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({	
	tourenliste: {	
			marginTop: '15px',
			[theme.breakpoints.up('md')]: {
				marginTop: '30px',
			  },

	},
}));

export default function TourList(props) {
	const classes = useStyles();
	const [appState, setAppState] = useState({
		loading: false,
		posts: null,
	});

	useEffect(() => {
        const url = 'touren/touren/'
		axiosInstance.get(url).then((res) => {
			const allPosts = res.data;
			setAppState({ ...appState,loading: false, posts: allPosts });
		});
	},[]);

if ((!appState.posts || appState.posts.length === 0) ) return <p>Bergrettung kann nicht ausruecken.</p>;
  return (
    <Box className={classes.tourenliste}>
    <Tours props={appState}/>
    </Box>

);

}




