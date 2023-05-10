import React, { useEffect, useState } from 'react';
import '../../../App.css';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import ListItemText from '@mui/material/ListItemText';
import { connect } from 'react-redux';
import { diffselection, tourselection, mapsearch} from '../../../actions/map';
import { CATEGORIES, GRADING } from '../../../SETTINGS';

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

const SelectionBar = ({   diffselection, tourselection, hardness, tourtype, searchstring, mapsearch}) => {

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
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
        <Toolbar>		
        <SearchIcon/>
        <TextField id="standard-basic" label="Sucheingabe" variant="standard" 
        onKeyUp={(ev)=>{mapsearch(ev.target.value) }}/>
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
            onChange={(handleChangeDiff)}
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
  )
}

const mapStateToProps = state => ({
    huttype: state.map.huttype,
	tourtype: state.map.tourtype,
	hardness: state.map.difficulty,
    searchstring: state.map.searchstring,

});
export default connect(mapStateToProps, { diffselection,  tourselection, mapsearch })(SelectionBar);