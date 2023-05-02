import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from '@material-ui/core';
import { connect } from 'react-redux';
import { diffselection, mapsearch, tourselection, huttypeselection } from '../../actions/map';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core';
import MuiToggleButton from "@mui/material/ToggleButton";
import { Typography } from '@mui/material';

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

 const ToggleButton = styled(MuiToggleButton)({
    width: 'calc(23%)',
    float: 'left',
    aspectRatio : '1 / 1',
    backgroundSize: '100%',
    margin: '1%',
    
   "&.Mui-selected, &.Mui-selected:hover": {
     color: "white",
     border: '5px solid #EE0E79',
    }
 });

 const DiffToggleButton = styled(MuiToggleButton)({
  width: 'calc(33.33% - 4px)',
  float: 'left',
  aspectRatio : '4 / 1',
  color:'white',
  fontFamily:'arial',
  fontWeight: '700',
  margin: '2px',
     "&.Mui-selected, &.Mui-selected:hover": {
   color: "white",
   border: '5px solid #EE0E79',
   outline: "3px solid white",
   outlineOffset: "-6px",
  }
});
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


const RenderMobile = ({diffselection, mapsearch, tourselection, tourtype, huttype, huttypeselection, hardness}) => {
  console.log(huttype)
  const cat_arr = ['Wandern','Hochtour','Klettertour','Hike and Fly','Skitour']
  const buttons = ['wd.jpeg','ht.jpeg','kl.jpeg','hikeandfly1.jpeg','st.jpeg']
  const hut_arr = ['Huette','Alm','Gasthof']
  const hutbuttons = ['huette.jpeg','alm.jpeg','gh.jpeg']
  const diff_arr = ['leicht', 'mittel', 'schwierig']
  const diff_colors = ['blue', 'red', 'black']

  const useStyles = makeStyles({
      buttonRow: {
        width: '100%',
        float: 'left',
      },

 })
 const classes = useStyles();

 function HutImages(data) {
  const  props  = data 
  let style={...{[props.bgtype]:props.bg}}
  let isIncluded = huttype.includes(props.selectorItem)

  return (
      <Box className={classes.ButtonBox}>
      <ToggleButton
        style={style}
        value="check"
        selected={isIncluded}
        onChange={() => {
  
          if(isIncluded){
            const array = huttype  
            huttypeselection(array.filter(a => a !== props.selectorItem))
          }
          else {
            huttypeselection(huttype.concat(props.selectorItem));
          }

        }}
      >
      </ToggleButton>
      </Box>
    );
  }
  function ToggleDiff(data) {
    const  props  = data 
    let style={...{[props.bgtype]:props.bg}}
    const isIncluded = hardness.includes(props.selectorItem)
      return (
        <DiffToggleButton
          style={style}
          value="check"
          selected={isIncluded}
          onChange={() => {
           if(isIncluded){
             const array = hardness              
             diffselection(array.filter(a => a !== props.selectorItem))
           }
           else {
             diffselection(hardness.concat(props.selectorItem));
           }
 
         }}
        >
          {props.selectorItem}
        </DiffToggleButton>
      );
    }
 function ToggleImage(data) {
  const  props  = data 
  let style={...{[props.bgtype]:props.bg}}
  let isIncluded = tourtype.includes(props.selectorItem)
  console.log(props.selectorItem)
  return (
      <ToggleButton

        style={style}
        value="check"
        selected={isIncluded}
        onChange={() => {
          if(isIncluded){
            const array = tourtype              
            tourselection(array.filter(a => a !== props.selectorItem))
          }
          else {
            
            tourselection(tourtype.concat(props.selectorItem));
          }
        }}
      >
      </ToggleButton>
    );
  }
  return (
    <React.Fragment>
      <Typography variant="h6">Huetten</Typography>
      <div className={classes.buttonRow}>       { 
                        hut_arr.map((item, i) => {
                                  let bgurl = `url("${process.env.REACT_APP_API_URL}/media/${hutbuttons[i]}")`
                                return(HutImages({'selectorItem':item, 'bg':bgurl, 'bgtype':"backgroundImage"}))
                          }  
                        )}
        </div>
      <Typography variant="h6">Touren</Typography>
 
        <div className={classes.buttonRow}>       { 
                        cat_arr.map((item, i) => {
                                  let bgurl = `url("${process.env.REACT_APP_API_URL}/media/${buttons[i]}")`
                                return(ToggleImage({'selectorItem':item, 'bg':bgurl, 'bgtype':"backgroundImage"}))
                          }  
                        )}
        </div>
     
        <div className={classes.DiffPicker}>
            {diff_arr.map((item,i) => {
            let color = diff_colors[i]
               return(ToggleDiff({
                                   'selectorItem':item, 
                                   'bg':color, 
                                   'bgtype':"backgroundColor",
                                   'styleOverrides': `width:'200px'`,
                                 }))
         })}
            </div> 
  </React.Fragment>
  )
}

const mapStateToProps = state => ({
  tourtype: state.map.tourtype,
  hardness: state.map.difficulty,
  searchphrase: state.map.searchstring,
  huttype: state.map.huttype,
  hardness: state.map.difficulty,

});
export default connect(mapStateToProps, { diffselection, mapsearch, tourselection, huttypeselection })(RenderMobile);