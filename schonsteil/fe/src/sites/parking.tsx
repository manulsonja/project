import * as React from 'react';
import axiosInstance from '../utils/axios';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Parking from '../components/Parking.tsx';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({	
	parkinglist: {	
			marginTop: '15px',
			[theme.breakpoints.up('md')]: {
				marginTop: '30px',
			  },
	},
}));

export default function ParkingList(props) {
	const classes = useStyles();
	const [appState, setAppState] = useState({
		loading: false,
		posts: null,
	});

	useEffect(() => {
        const url = 'parking/'
		axiosInstance.get(url).then((res) => {
			const allPosts = res.data;
			setAppState({ ...appState,loading: false, posts: allPosts });
		});
	}, []);

if ((!appState.posts || appState.posts.length === 0) ) return <p>Bergrettung kann nicht ausruecken.</p>;

  return (
    <Box className={classes.parkinglist}>
        <Parking props={appState}/>
    </Box>
);




}




