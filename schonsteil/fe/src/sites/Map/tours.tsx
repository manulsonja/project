import * as React from 'react';
import axiosInstance from '../utils/axios';
import { useState, useEffect } from 'react';
import Tours from '../components/Tours.tsx';
import { makeStyles } from '@material-ui/core';
import { Box } from '@material-ui/core';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import InfiniteScroll from 'react-infinite-scroll-component';

const useStyles = makeStyles((theme) => ({	
	huttenliste: {	
			marginTop: '15px',
			[theme.breakpoints.up('md')]: {
				marginTop: '30px',
			  },
	},
}));

export default function HutList(props) {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('md'));

	const classes = useStyles()
	const [appState, setAppState] = useState({
		loading: false,
		posts: null,
		next: null,
		previous: null
	});

	useEffect(() => {
		axiosInstance.get('touren/touren/').then((res) => {
			setAppState({ ...appState,loading: false, posts: res.data.results, next:res.data.next, previous:res.data.previous });
		});
	}, []); 

	const hasMore = () => { 
		if(appState.next===null)
		{return( false)} 
		else{ return(true)}}

	const fetchData = () => {
		axiosInstance.get(appState.next).then((res) => {
			setAppState({ ...appState,loading: false, posts: appState.posts.concat(res.data.results), next: res.data.next, previous:res.data.previous });
		})
	}

	const Loading = () => {
		console.log(appState)
		return (
			<InfiniteScroll
			dataLength={appState.posts.length} //This is important field to render the next data
			next={fetchData}
			hasMore={hasMore()}
			loader={<h4>Loading...</h4>}
			endMessage={
			  <p style={{ textAlign: 'center' }}>
				<b>Ende.</b>
			  </p>
			}
		  >
			<Tours props={appState}/>
		  </InfiniteScroll>
		)
	}
	
if ((!appState.posts || appState.posts.length === 0) ) return <p>Bergrettung kann nicht ausruecken.</p>;
return (
	<Box className={classes.huttenliste}>
 	{ Loading()}
	 </Box>
);

}




