import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import Posts from './components/Posts';
import axiosInstance from './axios';
import PostLoadingComponent from './components/PostLoading';
import Leaflet from './components/map';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ChipsArray from './components/chips.tsx';

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
  'wd',
  'ht',
  'kt',
  'haf',
  'st',
];
const query_string="?tourtypes="

function App() {
	const [personName, setPersonName] = React.useState([]);
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

		axiosInstance.get("touren/"+query_string+name_array).then((res) => {
			const allPosts = res.data;
			setAppState({ ...appState,loading: false, posts: allPosts });
		});
	}, [personName]);

	const handleChange = (event: SelectChangeEvent<typeof personName>) => {
	  const {
		target: { value },
	  } = event;
	  setPersonName(
		// On autofill we get a stringified value.
		typeof value === 'string' ? value.split(',') : value
	  );
	};

	return (
		<div className="App">
			 <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
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
	  <ChipsArray/>
    </div>
			<div><Leaflet data={appState.posts}/></div>
			<h1>Neueste Touren</h1>
			<PostLoading isLoading={appState.loading} posts={appState.posts} />
		</div>
	);
}
export default App;
