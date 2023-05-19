import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HeightIcon from '@mui/icons-material/Height';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import MuiToggleButton from "@mui/material/ToggleButton";
import Slider from '@mui/material/Slider';
import { connect } from 'react-redux';
import { diffselection, tourselection, durationselection, distanceselection, elevationselection } from '../actions/map';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles({

   divRowTwo:
   {
      width: '100%',
      float: 'left',
      padding: '3px',
   },
   mapButton:
   {
      width: '50%',
      float: 'left',
   },
   sliderBox:
   {
      width: '100%',
      float: 'left',
   },   
   DiffPicker:
   {
      width: '100%',
      float: 'left',

   },
   DiffPickerButton:
   {
      width: '33.3333%',
      float: 'left',
      color: 'white',
      fontFamily: 'arial',
      fontWeight: 'bold',
      padding: '3px',
      marginTop: "20px",
   },
   LeichtButton:
   {
     backgroundColor: "blue",
   },
   MittelButton:
   {
     backgroundColor: "red",
   },
   SchwerButton:
   {
     backgroundColor: "black",
   },
   SelectRegion: {
      marginBottom: '20px',
   },
   sliderIcon: {
      float: 'left',
      marginRight: '10px',
   },
   Slider: {
      float: 'none',
   },

})
  
const ToggleButton = styled(MuiToggleButton)({
   width: 'calc(20% - 4px)',
   float: 'left',
   aspectRatio : '1 / 1',
   backgroundSize: '100%',
   margin: '2px',
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



function Selector() {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Region
        </InputLabel>
        <NativeSelect
          defaultValue={30}
          inputProps={{
            name: 'age',
            id: 'uncontrolled-native',
          }}
        >


         <option value={1}>Alle</option>
          <option value={10}>Oberland</option>
          <option value={20}>Tirol Mitte</option>
          <option value={30}>Unterland</option>
          <option value={30}>Osttirol</option>
          <option value={30}>Suedtirol</option>
          <option value={30}>Trentino</option>

        </NativeSelect>
      </FormControl>
    </Box>
  );
}

const Picker = ({tourtype, 
                  hardness, 
                  tourselection, 
                  diffselection, 
                  distance, 
                  duration, 
                  elevation, 
                  distanceselection, 
                  elevationselection, 
                  durationselection,
                  distance_max,
                  duration_max}) => {
  
  function ToggleDiff(data) {
    const  props  = data 
    const style={...{[props.bgtype]:props.bg}}
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
    function RangeSlider(valuearray, change, maxrange) {
      const handleSliderChange = (event: Event, newValue: number | number[]) => {
        change(newValue as number[])
      };
      function valuetext(value: number) {
          return `${value}°C`;
        }
            return (         
        <Box  sx={{ flexGrow: 1 }}>
          <Slider
            getAriaLabel={() => 'Temperature range'}
            value={valuearray}
            onChange={handleSliderChange}
            onChangeCommitted={() => console.log('database query now')}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            max={maxrange}
          />
        </Box>
      );
    }
  function ToggleImage(data) {
    const  props  = data 
    const isIncluded = tourtype.includes(props.selectorItem)
    const style={...{[props.bgtype]:props.bg}}
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

const cat_arr = ['Wandern','Hochtour','Klettern','Hike and Fly','Skitour']
const buttons = ['wandern.jpeg','hochtour.jpeg','klettern.jpeg','hikeandfly.jpeg','skitour.jpeg']

const diff_arr = ['leicht', 'mittel', 'schwierig']
const diff_colors = ['blue', 'red', 'black']

const classes = useStyles();

return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={0}>    
        <Item>
         {cat_arr.map((item, i) => {
            const bgurl = `url("${process.env.REACT_APP_API_URL}/media/ressources/navButtons/${buttons[i]}")`
               return(ToggleImage({'selectorItem':item, 'bg':bgurl, 'bgtype':"backgroundImage"}))
         })}
  
   </Item>
        <Item>
          <div className={classes.divRowTwo} >
            <div className={classes.SelectRegion}>
               {Selector()}
            </div>

              <div className={classes.sliderBox} >
               <div className={classes.sliderIcon}>
                  <AccessTimeIcon/>
               </div>
               <div className={classes.Slider}>{RangeSlider(distance, distanceselection, distance_max)}
               </div>
               <div className={classes.sliderIcon}>
                  <HeightIcon/>
               </div>
               <div className={classes.Slider}>{RangeSlider(elevation, elevationselection, distance_max)}
               </div>
               <div className={classes.sliderIcon}>
                  <SettingsEthernetIcon/>
               </div>
               <div className={classes.Slider}>{RangeSlider(duration, durationselection, duration_max)}
               </div>
            </div>

            <div className={classes.DiffPicker}>
            {diff_arr.map((item,i) => {
            const color = diff_colors[i]
               return(ToggleDiff({
                                   'selectorItem':item, 
                                   'bg':color, 
                                   'bgtype':"backgroundColor",
                                   'styleOverrides': `width:'200px'`,
                                 }))
         })}
            </div>     
          </div>
          <div className={classes.divRowTwo}>
            <img className={classes.mapButton} src={`${process.env.REACT_APP_API_URL}/media/mapmap.jpeg`}></img>
          </div>
        </Item>

      </Stack>
    </Box>
  );
}
const mapStateToProps = (state) => ({
  tourtype: state.map.tourtype,
  hardness: state.map.difficulty,
  distance: state.map.distance,
  elevation: state.map.elevation,
  duration: state.map.duration,
  distance_max: state.map.distance_max,
  duration_max: state.map.duration_max,


  
})
export default connect(mapStateToProps, {tourselection, diffselection, durationselection, elevationselection, distanceselection})(Picker)