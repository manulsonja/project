import React, { useEffect, useState } from 'react';
import '../../App.css';
import Posts from '../../components/Posts';
import axiosInstance from '../../utils/axios';
import PostLoadingComponent from '../../components/PostLoading';
import Leaflet from './components/LeafletMap';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { connect } from 'react-redux';
import { mapsearch, diffselection, tourselection } from '../../actions/map';
import { CATEGORIES, GRADING } from '../../SETTINGS';
import  MobileMap  from './components/mobileMap.tsx';
import SelectionBar from './components/SelectionBar.tsx';

function getCurrentDimension(){
return { width: window.innerWidth, height: window.innerHeight }}

const names = CATEGORIES

function Map({ hardness, tourtype, huttype, searchphrase, mapbounds }) {

const [screenSize, setScreenSize] = useState(getCurrentDimension());
const theme = useTheme()

const matches = useMediaQuery(theme.breakpoints.up('lg'));
const matchespad = useMediaQuery(theme.breakpoints.up('sm'));

const PostLoading = PostLoadingComponent(Posts);
const [appState, setAppState] = useState({
	loading: false,
	posts: null,

});
const [hutState, setHuts] = useState({
	loading: false,
	huts: null,
	huturl: 'huts/'
});
const [locationState, setLocations] = useState({
	loading: false,
	locations: null,
	locationUrl: 'parking/'
});
useEffect(() => {
	let name_array;
	if ((!tourtype || tourtype.length === 0) ) {
		name_array=names
	}
	else name_array=tourtype;
	const url = "touren/touren/filter/"
	const config = {
        headers: {
            'Content-Type': 'application/json'
        }
	}
	const body =  {
		tourtypes: name_array,
		searchstring: searchphrase,
		difficulty: hardness,
		mapbounds: mapbounds, 
		}

	axiosInstance.post(url, body).then((res) => {
		const allPosts = res.data.results;
		setAppState({ ...appState,loading: false, posts: allPosts });
	});
}, [tourtype, searchphrase, hardness, mapbounds]);

const hut_body = {
	'huttype': huttype,
	'searchstring': searchphrase,

	} 
useEffect(() =>{


		axiosInstance.post('huts/filter/', hut_body).then((res) => {
		const huts = res.data.results;
		setHuts({ ...hutState,loading: false, huts: huts });
	});
},[huttype, searchphrase])

useEffect(() =>{
	axiosInstance.get(locationState.locationUrl).then((res) => {
	const locations = res.data.results;
	setLocations({ ...locationState,loading: false, locations: locations });
});
},[])

const handleResize = () => {
	setScreenSize(getCurrentDimension());}

React.useEffect(() => {
		window.addEventListener('resize', handleResize);	
		// cleanup this component
		return () => {
			window.addEventListener('resize', handleResize);
		};
	}, []);

const DeskTopMap =() => {
	return(
		<React.Fragment>		
				<SelectionBar/>
				<div className='outerBox'>
				<div className='leftColumn'>
					<Leaflet props={{'state' : appState,'huts':hutState.huts, 'locations': locationState.locations, 'screen': screenSize, 'offset':7}}/>
				</div>
				<div className='rightColumn' style={{height:screenSize.height-119}}><PostLoading isLoading={appState.loading} posts={appState.posts} /></div>
				</div>
	</React.Fragment>
)}

const PadMap =() => {
	return(
		<React.Fragment>
		<SelectionBar/>
		<div className='outerBox'>
				<div className='leftColumn' style={{width:'100%'}}><Leaflet props={{'state' : appState, 'screen': screenSize, 'offset':7}}/></div>
		</div>
		</React.Fragment>
)
}

return (
	<React.Fragment>
		{(matches ? DeskTopMap():(matchespad ? PadMap():<MobileMap props={{screenSize, appState, hutState, locationState}}/> ))}
</React.Fragment>
);
}
const mapStateToProps = state => ({
huttype: state.map.huttype,
tourtype: state.map.tourtype,
hardness: state.map.difficulty,
searchphrase: state.map.searchstring,
mapbounds: state.map.mapbounds,

});
export default connect(mapStateToProps, { diffselection, mapsearch, tourselection })(Map);