import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { MEDIA_URL } from '../SETTINGS';
import { makeStyles } from '@material-ui/core';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HeightIcon from '@mui/icons-material/Height';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import MuiToggleButton from "@mui/material/ToggleButton";
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import Slider from '@mui/material/Slider';


function RangeSlider() {
    const [value, setValue] = React.useState<number[]>([20, 37]); 
    const handleSliderChange = (event: Event, newValue: number | number[]) => {
      setValue(newValue as number[]);
      console.log(value)
    };
    function valuetext(value: number) {
        return `${value}°C`;
      }
          return (
            
      <Box  sx={{ flexGrow: 1 }}>
        <Slider
          getAriaLabel={() => 'Temperature range'}
          value={value}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
        />
      </Box>
    );
  }
  
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

function ToggleImage(data) {
const  props  = data 
let style={...{[props.bgtype]:props.bg}}
  return (
    <ToggleButton
      style={style}
      value="check"
      selected={props.selected[props.selectorItem]}
      onChange={() => {
        props.setSelected({...props.selected, [props.selectorItem] : !props.selected[props.selectorItem]});
      }}
    >
    </ToggleButton>
  );
}
function ToggleDiff(data) {
   const  props  = data 
   let style={...{[props.bgtype]:props.bg}}
     return (
       <DiffToggleButton
         style={style}
         value="check"
         selected={props.selected[props.selectorItem]}
         onChange={() => {
           props.setSelected({...props.selected, [props.selectorItem] : !props.selected[props.selectorItem]});
         }}
       >
         {props.selectorItem}
       </DiffToggleButton>
     );
   }
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
      width: '100%',
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
      overflow: 'hidden',
   },

})

export default function Picker() {

const cat_arr = ['Wandern','Hochtour','Klettertour','Hike and Fly','Skitour']
const buttons = ['wd.jpeg','ht.jpeg','kl.jpeg','hikeandfly1.jpeg','st.jpeg']
const cat_obj = {'Wandern': false,'Hochtour':false,'Klettertour':false,'Hike and Fly':false,'Skitour':false}

const diff_arr = ['leicht', 'mittel', 'schwer']
const diff_obj = {'leicht':false,'mittel':false,'schwer':false}
const diff_colors = ['blue', 'red', 'black']

const [selected, setSelected] = React.useState(cat_obj);
const classes = useStyles();

const handleChange = () => {
  console.log('changed')
}
const handleSubmit = () => {
  console.log(selected) 
}

useEffect(() => {   
      handleChange()

 },[selected]);




return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={0}>    
        <Item>
         {cat_arr.map((item, i) => {
            let bgurl = `url("${MEDIA_URL}/media/${buttons[i]}")`
               return(ToggleImage({'selected':selected, 'setSelected':setSelected, 'selectorItem':item, 'bg':bgurl, 'bgtype':"backgroundImage"}))

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
               <div className={classes.Slider}>{RangeSlider()}
               </div>
               <div className={classes.sliderIcon}>
                  <HeightIcon/>
               </div>
               <div className={classes.Slider}>{RangeSlider()}
               </div>
               <div className={classes.sliderIcon}>
                  <SettingsEthernetIcon/>
               </div>
               <div className={classes.Slider}>{RangeSlider()}
               </div>
            </div>

            <div className={classes.DiffPicker}>
            {diff_arr.map((item,i) => {
            let color = diff_colors[i]
               return(ToggleDiff({'selected':selected, 
                                   'setSelected':setSelected, 
                                   'selectorItem':item, 
                                   'bg':color, 
                                   'bgtype':"backgroundColor",
                                   'styleOverrides': `width:'200px'`,
                                 }))

         })}
            </div>
          
          </div>
          <div className={classes.divRowTwo}>
            <img className={classes.mapButton} src={`${MEDIA_URL}/media/mapmap.jpeg`}></img>
          </div>
        </Item>

      </Stack>
    </Box>
  );
}