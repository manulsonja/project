import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from '@material-ui/core';
import { connect } from 'react-redux';
import { diffselection, mapsearch, tourselection } from '../../actions/map';

const diff = [
  'leicht',
  'mittel',
  'schwierig',
 
];
const tourtypes = [
    'Wandern',
    'Skitour',
    'Hochtour',
    'Hike and Fly',
    'Klettertour'
   
  ];
  
function NativeSelect(options, state) {
  const [personName, setPersonName] = React.useState<string[]>([]);
  const handleChangeMultiple = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { options } = event.target;
    const value: string[] = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setPersonName(value);
    state(value)
  };

  return (
    <Box sx={{p: 1}}>
      <FormControl sx={{ minWidth: 120, width: '100%' }}>
        <InputLabel shrink htmlFor="select-multiple-native">
          Native
        </InputLabel>
        <Select
          multiple
          native
          value={personName}
          // @ts-ignore Typings are not considering `native`
          onChange={handleChangeMultiple}
          label="Native"
          inputProps={{
            id: 'select-multiple-native',
          }}
        >
          {options.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}


const renderMobile = ({diffselection, mapsearch, tourselection}) => {
  return (
    <React.Fragment>
        <Box>
    {NativeSelect(diff, diffselection)}        
        </Box>
   
  {NativeSelect(tourtypes, tourselection)}    
  </React.Fragment>

  )
}

export default connect(null, { diffselection, mapsearch, tourselection })(renderMobile);