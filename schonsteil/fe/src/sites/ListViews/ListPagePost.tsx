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
import { distancesetmax, durationsetmax, durationselection, elevationsetmax} from '../../actions/map';
import { Button, Collapse } from '@mui/material';
import { Grid } from '@mui/material';
import TourSlider from '../Map/components/MobileMenu/TourSlider.tsx';
import DiffSelector from '../Map/components/DesktopMenu/DiffSelector.tsx';
import LoadingSpinner from '../../components/LoadingSpinner.tsx';

const drawerWidth = 150;

const useStyles = makeStyles((theme) => ({	
huttenliste: {	
		marginTop: '15px',
		[theme.breakpoints.up('md')]: {
			marginTop: '5px',
			},
},
sideBar: {
	backgroundColor: '#272727',
}
}));

function ListPagePost({	props, 
						distancesetmax, 
						durationsetmax, 
						elevationsetmax, 
						huttype, 
						tourtype,
						searchstring,
						distance, 
						elevation, 
						duration,
						difficulty,
						reload_state,
					}) {
				
const init_type = (type) =>
{
	switch (type) {
		case 'hut': {
			const url = 'huts/filter/';
			const body = {
				'huttype': huttype,
				'searchstring': searchstring,
			
		}
	return({'body': body, 'url': url})
}
case 'tour': {
	const url = 'touren/touren/tour-filter/';
	const body = {
		'tourtypes': tourtype,
		'searchstring': searchstring,
		'difficulty': difficulty,
		'distance': distance,
		'elevation': elevation,
		'duration': duration, 
		'mapbounds':'',
	
}
return({'body': body, 'url': url})
}
		break;
	

	}
}

const {body, url} = init_type(props.type)


const [opened, setOpened] = React.useState(false)
const theme = useTheme()
const matches = useMediaQuery(theme.breakpoints.up('sm'));
const type = props.type
const classes = useStyles()
const [appState, setAppState] = useState({
	loading: true,
	posts: null,
	next: null,
	previous: null
});

useEffect(() => {
		setAppState({...appState, loading: true})
		axiosInstance.post(url, body).then((res) => {
		setAppState({ ...appState, loading: false, posts: res.data.results, next:res.data.next, previous:res.data.previous });

		const duration_max = res.data.duration_slider;
		const distance_max = parseInt(res.data.distance_slider);
		const elevation_max = res.data.elevation_slider

		distancesetmax(distance_max);
		durationsetmax(duration_max);
		elevationsetmax(elevation_max);

	});
}, [huttype, searchstring, tourtype, difficulty, reload_state]); 



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
const renderSlider = () => { return(
	<React.Fragment>
	<Button onClick={() => {setOpened(!opened)}} style={{marginLeft:'200px'}}>Touren filtern!</Button>
	<Collapse in={opened}>
	<Box sx={{ marginLeft: '20px', marginRight: '20px', paddingBottom: '15px', marginBottom: '10px', boxShadow:" 0 4px 2px -2px gray"}}>
	<Grid container spacing={2}>
		<Grid item  md={6}  xs={12}>
		<TourSlider/>
		</Grid>
		<Grid item  md={6}  xs={12}>
		<DiffSelector/>
		</Grid> 
		
	</Grid>
	</Box>
	</Collapse>
</React.Fragment>
)}

return (
<React.Fragment>  
<Box className={classes.huttenliste} style={{marginLeft:(matches? '150px': null)}}>
{((type==='tour' && matches)?  renderSlider(): null)}
{(appState.loading? <LoadingSpinner/> :     
(!appState.posts || appState.posts.length === 0)? 'Keine Ergebnisse. Anscheinend hat die Wandersaison noch nicht begonnen.': Loading()
)}
</Box>
</React.Fragment>
);
}

const mapStateToProps = state => ({
huttype: state.map.huttype,
searchstring: state.map.searchstring,
difficulty: state.map.difficulty, 
tourtype: state.map.tourtype, 
duration: state.map.duration, 
elevation: state.map.elevation, 
distance: state.map.distance, 
reload_state: state.map.reload_state,

})
export default connect(mapStateToProps,{ distancesetmax, durationsetmax, durationselection, elevationsetmax})(ListPagePost)

