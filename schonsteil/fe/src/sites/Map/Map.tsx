import React, { useEffect, useState } from 'react';
import '../../App.css';
import Posts from '../../components/Posts';
import axiosInstance from '../../utils/axios';
import PostLoadingComponent from '../../components/PostLoading';
import Leaflet from './components/LeafletMap';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import ListItemText from '@mui/material/ListItemText';
import { connect } from 'react-redux';
import { mapsearch, diffselection, tourselection } from '../../actions/map';
import { CATEGORIES, GRADING } from '../../SETTINGS';
import  MobileMap  from './components/mobileMap.tsx';

function getCurrentDimension(){
    return { width: window.innerWidth, height: window.innerHeight }}

const query_string="?tourtypes="
const diff_querystring='&diff='
const search_querystring='&search='
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const names = CATEGORIES
const diff_array = GRADING

function Map({  diffselection, tourselection, hardness, tourtype, huttype }) {

	const [screenSize, setScreenSize] = useState(getCurrentDimension());
	const [SearchString, setSearchString] = React.useState('');
	const theme = useTheme();

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
		const url = "touren/touren/"+query_string+name_array+search_querystring+SearchString+diff_querystring+hardness
		axiosInstance.get(url).then((res) => {
			const allPosts = res.data.results;
			setAppState({ ...appState,loading: false, posts: allPosts });
		});
	}, [tourtype, SearchString, hardness]);
	
	useEffect(() =>{

			let url;
			if(huttype.length==0) {
				url = hutState.huturl  }
			else {
				url = hutState.huturl+'?huttypes='+huttype;
			}

			axiosInstance.get(url.toLocaleLowerCase()).then((res) => {
			const huts = res.data.results;
			setHuts({ ...hutState,loading: false, huts: huts });
		});
	},[huttype])

	useEffect(() =>{
		axiosInstance.get(locationState.locationUrl).then((res) => {
		const locations = res.data.results;
		setLocations({ ...locationState,loading: false, locations: locations });
	});
},[])



	const handleChange = (event: SelectChangeEvent<typeof tourtype>) => {
	const {
		target: { value },
		} = event;
	tourselection(typeof value === 'string' ? value.split(',') : value)

	};

	const handleChangeDiff = (event: SelectChangeEvent<typeof hardness>) => {
		const {
			target: { value },
		} = event;

		diffselection(typeof value === 'string' ? value.split(',') : value)
	};

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
				<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Toolbar>		
					<SearchIcon/>
					<TextField id="standard-basic" label="Sucheingabe" variant="standard" 
					onKeyUp={(ev)=>{setSearchString(ev.target.value); console.log(ev.target.value) }}/>
					<Typography>
						Tourentyp
					</Typography>

					<FormControl sx={{ m: 0.5, width: 200, paddingTop:1}}>
							<Select
							size="small"
							id="demo-multiple-checkbox"
							multiple
							value={tourtype}
							onChange={handleChange}
							input={<OutlinedInput label="Tag" />}
							renderValue={(selected) => selected.join(', ')}
							MenuProps={MenuProps}
							>
							{names.map((name) => (
								<MenuItem key={name} value={name}>
								<Checkbox checked={tourtype.indexOf(name) > -1} />
								<ListItemText primary={name} />
								</MenuItem>
							))}
							</Select>
						</FormControl>

					<Typography>
						Anspruch
					</Typography>
					
					<FormControl sx={{ m: 0.5, width: 200, paddingTop:1}}>
						<Select 
						size="small"
						id="hardness-checkbox"
						multiple
						value={hardness}
						onChange={handleChangeDiff}
						input={<OutlinedInput label="Tag" />}
						renderValue={(selected) => selected.join(', ')}
						MenuProps={MenuProps}
						>
						{diff_array.map((diff) => (
							<MenuItem key={diff} value={diff}>
							<Checkbox checked={hardness.indexOf(diff) > -1} />
							<ListItemText primary={diff} />
							</MenuItem>
						))}
						</Select>
					</FormControl>
					</Toolbar>
					</AppBar>
					</Box>

					<div className='outerBox'>
					<div className='leftColumn'>
						<Leaflet props={{'state' : appState,'huts':hutState.huts, 'locations': locationState.locations, 'screen': screenSize, 'offset':119}}/>
					</div>
					<div className='rightColumn' style={{height:screenSize.height-119}}><PostLoading isLoading={appState.loading} posts={appState.posts} /></div>
					</div>
		</React.Fragment>
	)}

	const PadMap =() => {
		return(
			<React.Fragment>
				
			<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					
			<SearchIcon/>
			<TextField id="standard-basic" label="Sucheingabe" variant="standard" 
			onKeyUp={(ev)=>{setSearchString(ev.target.value); console.log(ev.target.value) }}/>

			<Typography>
				Tourentyp
			</Typography>

			<FormControl sx={{ m: 0.5, width: 200, paddingTop:1}}>
					<Select
					size="small"
					id="demo-multiple-checkbox"
					multiple
					value={tourtype}
					onChange={handleChange}
					input={<OutlinedInput label="Tag" />}
					renderValue={(selected) => selected.join(', ')}
					MenuProps={MenuProps}
					>
					{names.map((name) => (
						<MenuItem key={name} value={name}>
						<Checkbox checked={tourtype.indexOf(name) > -1} />
						<ListItemText primary={name} />
						</MenuItem>
					))}
					</Select>
				</FormControl>

			<Typography>
				Anspruch
			</Typography>
			
			<FormControl sx={{ m: 0.5, width: 200, paddingTop:1}}>
				<Select 
				size="small"
				id="hardness-checkbox"
				multiple
				value={hardness}
				onChange={handleChangeDiff}
				input={<OutlinedInput label="Tag" />}
				renderValue={(selected) => selected.join(', ')}
				MenuProps={MenuProps}
				>
				{diff_array.map((diff) => (
					<MenuItem key={diff} value={diff}>
					<Checkbox checked={hardness.indexOf(diff) > -1} />
					<ListItemText primary={diff} />
					</MenuItem>
				))}
				</Select>
			</FormControl>
			</Toolbar>
			</AppBar>
			</Box>
			<div className='outerBox'>
					<div className='leftColumn' style={{width:'100%'}}><Leaflet data={{'state' : appState, 'screen': screenSize, 'offset':119}}/></div>
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

});
export default connect(mapStateToProps, { diffselection, mapsearch, tourselection })(Map);