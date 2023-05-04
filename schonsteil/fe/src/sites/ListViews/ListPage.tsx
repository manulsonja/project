	import * as React from 'react';
	import axiosInstance from '../../utils/axios';
	import { useState, useEffect } from 'react';
	import Tours from './Tiles/Tours.tsx';
	import { makeStyles } from '@material-ui/core';
	import { Box } from '@material-ui/core';
	import InfiniteScroll from 'react-infinite-scroll-component';
	import Huts from './Tiles/Huts.tsx';
	import Parking from './Tiles/Parking.tsx';
	import useMediaQuery from '@mui/material/useMediaQuery';
	import { useTheme } from '@mui/material/styles';
	import { connect } from 'react-redux';
	import { distancesetmax, durationsetmax } from '../../actions/map';

	const drawerWidth = 150;

	const useStyles = makeStyles((theme) => ({	
	huttenliste: {	
			marginTop: '15px',
			[theme.breakpoints.up('md')]: {
				marginTop: '30px',
				},
	},
	sideBar: {
		backgroundColor: '#272727',
	}
	}));

	function ListPage({props, distancesetmax, durationsetmax}) {
	const theme = useTheme()
	const matches = useMediaQuery(theme.breakpoints.up('sm'));
	const type = props.type
	const classes = useStyles()
	const [appState, setAppState] = useState({
		loading: false,
		posts: null,
		next: null,
		previous: null
	});

	useEffect(() => {
		axiosInstance.get(props.url).then((res) => {
			setAppState({ ...appState,loading: false, posts: res.data.results, next:res.data.next, previous:res.data.previous });
			const duration_max = res.data.duration_slider;
			const distance_max = parseInt(res.data.distance_slider);
			distancesetmax(distance_max);
			durationsetmax(duration_max);	
		});
	}, [props.url]); 

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
			{(type==='tour'? <Tours props={appState}/>: null)}
			{(type==='hut'? <Huts props={appState}/>: null)}
			{(type==='parking'? <Parking props={appState}/>: null)}

			
			</InfiniteScroll>
		)
	}

	if ((!appState.posts || appState.posts.length === 0) ) return <p>Bergrettung kann nicht ausruecken.</p>;
	return (
	<React.Fragment>  
	<Box className={classes.huttenliste} style={{marginLeft:(matches? '150px': null)}}>
	{ Loading()}
		</Box>
	</React.Fragment>
	);
	}

const mapStateToProps = state => ({
	tourtype: state.map.tourtype
})
export default connect(mapStateToProps,{distancesetmax, durationsetmax})(ListPage)

