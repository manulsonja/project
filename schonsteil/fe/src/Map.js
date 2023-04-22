import React, { useEffect, useState } from 'react';
import './App.css';
import Posts from './components/Posts';
import axiosInstance from './axios';
import PostLoadingComponent from './components/PostLoading';
import Leaflet from './components/map';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';


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
function Map() {
	const [personName, setPersonName] = React.useState([]);
	const [screenSize, setScreenSize] = useState(getCurrentDimension());
	const [SearchString, setSearchString] = React.useState('');
	const [difficulty, setDifficulty] = React.useState([]);

	const PostLoading = PostLoadingComponent(Posts);
	const [appState, setAppState] = useState({
		loading: false,
		posts: null,
	});

	useEffect(() => {
		let name_array;
		if ((!personName || personName.length === 0) ) {
			 name_array=names
		}
		else name_array=personName;
		const url = "touren/"+query_string+name_array+search_querystring+SearchString+diff_querystring+difficulty
		axiosInstance.get(url).then((res) => {
			const allPosts = res.data;
			setAppState({ ...appState,loading: false, posts: allPosts });
		});
	}, [personName, SearchString, difficulty]);

	const handleChange = (event: SelectChangeEvent<typeof personName>) => {
	  const {
		target: { value },
	  } = event;
	  setPersonName(
		// On autofill we get a stringified value.
		typeof value === 'string' ? value.split(',') : value
	  );
	};

	const handleChangeDiff = (event: SelectChangeEvent<typeof difficulty>) => {
		const {
		  target: { value },
		} = event;
		setDifficulty(
		  // On autofill we get a stringified value.
		  typeof value === 'string' ? value.split(',') : value
		);
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
	
	return (
		<div className="App">
			 <div className="FilterBar">
	<div className='searchField'>
		<h1>Search</h1>
			<TextField id="standard-basic" label="Sucheingabe" variant="standard" 
			onKeyUp={(ev)=>{setSearchString(ev.target.value); console.log(ev.target.value) }}/></div>
	<div className='selectors'>
		<h1>Tourentyp</h1>
      <FormControl sx={{ m: 0.5, width: 300, paddingTop:1}}>
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
	  </div>

	  <div className='selectors_two'>
	  <h1>Anspruch</h1>
     
	  <FormControl sx={{ m: 0.5, width: 300, paddingTop:1}}>
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
	</div>
	
{/* 	  <ChipsArray/>
 */}    </div>
			<div className='outerBox'>
			<div className='leftColumn'><Leaflet data={[appState,screenSize]}/></div>
			<div className='rightColumn' style={{height:screenSize.height-120}}><PostLoading isLoading={appState.loading} posts={appState.posts} /></div>
			</div>
		</div>
	);
}
export default Map;
