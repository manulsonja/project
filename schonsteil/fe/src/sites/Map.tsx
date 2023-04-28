import React, { useEffect, useState } from 'react';
import '../App.css';
import Posts from '../components/Posts';
import axiosInstance from '../utils/axios';
import PostLoadingComponent from '../components/PostLoading';
import Leaflet from '../components/LeafletMap';
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
import TuneIcon from '@mui/icons-material/Tune';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import MultipleSelectNative from './Map/nativeSelect.tsx';
import { connect } from 'react-redux';
import { mapsearch, diffselection, tourselection } from '../actions/map';

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
const names = [
  'Wandern',
  'Hochtour',
  'Klettertour',
  'Hike and Fly',
  'Skitour', ];
  const diff_array = [
	'leicht',
	'mittel',
	'schwierig' ];

function Map({ mapsearch, diffselection, tourselection, hardness, tourtype, searchphrase }) {
	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	  });
	const [personName, setPersonName] = React.useState([]);
	const [screenSize, setScreenSize] = useState(getCurrentDimension());
	const [SearchString, setSearchString] = React.useState('');
	const [difficulty, setDifficulty] = React.useState([]);
	const theme = useTheme();

	const matches = useMediaQuery(theme.breakpoints.up('lg'));
	const matchespad = useMediaQuery(theme.breakpoints.up('sm'));

	const PostLoading = PostLoadingComponent(Posts);
	const [appState, setAppState] = useState({
		loading: false,
		posts: null,
	});

	useEffect(() => {
		let name_array;
		if ((!tourtype || tourtype.length === 0) ) {
			 name_array=names
		}
		else name_array=tourtype;
		const url = "touren/touren/"+query_string+name_array+search_querystring+SearchString+diff_querystring+hardness
		axiosInstance.get(url).then((res) => {
			const allPosts = res.data;
			setAppState({ ...appState,loading: false, posts: allPosts });
		});
	}, [tourtype, SearchString, hardness]);

	const handleChange = (event: SelectChangeEvent<typeof personName>) => {
	  const {
		target: { value },
	  } = event;
	  setPersonName(
		// On autofill we get a stringified value.
		typeof value === 'string' ? value.split(',') : value
	  );
	  tourselection(typeof value === 'string' ? value.split(',') : value)

	};

	const handleChangeDiff = (event: SelectChangeEvent<typeof difficulty>) => {
		const {
		  target: { value },
		} = event;
		setDifficulty(
		  // On autofill we get a stringified value.
		  typeof value === 'string' ? value.split(',') : value
		);
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
							value={personName}
							onChange={handleChange}
							input={<OutlinedInput label="Tag" />}
							renderValue={(selected) => selected.join(', ')}
							MenuProps={MenuProps}
							>
							{names.map((name) => (
								<MenuItem key={name} value={name}>
								<Checkbox checked={personName.indexOf(name) > -1} />
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
						id="difficulty-checkbox"
						multiple
						value={difficulty}
						onChange={handleChangeDiff}
						input={<OutlinedInput label="Tag" />}
						renderValue={(selected) => selected.join(', ')}
						MenuProps={MenuProps}
						>
						{diff_array.map((diff) => (
							<MenuItem key={diff} value={diff}>
							<Checkbox checked={difficulty.indexOf(diff) > -1} />
							<ListItemText primary={diff} />
							</MenuItem>
						))}
						</Select>
					</FormControl>
					</Toolbar>
					</AppBar>
					</Box>

					<div className='outerBox'>
					<div className='leftColumn'><Leaflet data={{'state' : appState, 'screen': screenSize, 'offset':119}}/></div>
					<div className='rightColumn' style={{height:screenSize.height-119}}><PostLoading isLoading={appState.loading} posts={appState.posts} /></div>
					</div>
		</React.Fragment>
	)
	}

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
					value={personName}
					onChange={handleChange}
					input={<OutlinedInput label="Tag" />}
					renderValue={(selected) => selected.join(', ')}
					MenuProps={MenuProps}
					>
					{names.map((name) => (
						<MenuItem key={name} value={name}>
						<Checkbox checked={personName.indexOf(name) > -1} />
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
				id="difficulty-checkbox"
				multiple
				value={difficulty}
				onChange={handleChangeDiff}
				input={<OutlinedInput label="Tag" />}
				renderValue={(selected) => selected.join(', ')}
				MenuProps={MenuProps}
				>
				{diff_array.map((diff) => (
					<MenuItem key={diff} value={diff}>
					<Checkbox checked={difficulty.indexOf(diff) > -1} />
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

	const MobileMap =() => {
		return(
			<React.Fragment>			
				<Box sx={{ flexGrow: 1 }}>	
				</Box>
			<div className='outerBox'>
					<div className='leftColumn' style={{width:'100%'}}><Leaflet data={{'state' : appState, 'screen': screenSize, 'offset':112}}/></div>
			</div>
			<AppBar position="static">
				<Toolbar>
				<IconButton
				  size="large"
				  edge="start"
				  color="inherit"
				  aria-label="menu"
				  sx={{ mr: 2 }}
				  onClick={toggleDrawer("bottom", true)}
				>
				  <MenuIcon />
				</IconButton>
				<TuneIcon/>	
				<Typography variant='h2'>
					Filter waehlen
				</Typography>
				</Toolbar>
			</AppBar>
</React.Fragment>
	)
	}


	const toggleDrawer =
	(anchor: Anchor, open: boolean) =>
	(event: React.KeyboardEvent | React.MouseEvent) => {
	  if (
		event &&
		event.type === 'keydown' &&
		((event as React.KeyboardEvent).key === 'Tab' ||
		  (event as React.KeyboardEvent).key === 'Shift')
	  ) {
		return;
	  }

	  setState({ ...state, [anchor]: open });
	};

	const list = (anchor: Anchor) => (
		<Box
		  sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
		  role="presentation"
		  onKeyDown={toggleDrawer(anchor, false)}
		>
		  <MultipleSelectNative />		  
		</Box>
	  );


	return (
		<React.Fragment>
		<div>		
		<SwipeableDrawer
		  anchor={"bottom"}
		  open={state["bottom"]}
		  onClose={toggleDrawer('bottom', false)}
		  onOpen={toggleDrawer('bottom', true)}
		>			
			{list("bottom")}
		</SwipeableDrawer>
  		</div>
{		(matches ? DeskTopMap():(matchespad ? PadMap(): MobileMap()))
}		</React.Fragment>
	);
}
const mapStateToProps = state => ({
    tourtype: state.map.tourtype,
	hardness: state.map.difficulty,
	searchphrase: state.map.searchstring,

});
export default connect(mapStateToProps, { diffselection, mapsearch, tourselection })(Map);