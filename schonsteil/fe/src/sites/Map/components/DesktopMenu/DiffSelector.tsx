import * as React from 'react';
import { connect } from 'react-redux';
import { diffselection, tourselection, durationselection, distanceselection, elevationselection} from '../../../../actions/map';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core';
import MuiToggleButton from "@mui/material/ToggleButton";
import { ListItem, Typography } from '@mui/material';
import { Collapse } from '@mui/material';
import { List } from '@mui/material';
import Slider from '@mui/material/Slider';


const tour_arr = ['Wandern','Hochtour','Klettertour','Hike and Fly','Skitour']
  const tourbuttons = ['wd.jpeg','ht.jpeg','kl.jpeg','hikeandfly1.jpeg','st.jpeg']
  const diff_arr = ['leicht', 'mittel', 'schwierig']
  const diff_colors = ['blue', 'red', 'black']


const DiffToggleButton = styled(MuiToggleButton)({
    width: 'calc(33.33% - 4px)',
    height: '70px',

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
  

const DiffSelector = ({hardness, diffselection}) => {

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
        
  return (


    diff_arr.map((item,i) => {
    const color = diff_colors[i]
        return(ToggleDiff({
                            'selectorItem':item, 
                            'bg':color, 
                            'bgtype':"backgroundColor",
                            'styleOverrides': `width:'200px'`,
                          }))
    })





    )
}

const mapStateToProps = state => ({
    tourtype: state.map.tourtype,
    hardness: state.map.difficulty,
    duration: state.map.duration,
    elevation: state.map.elevation,
    distance: state.map.distance,
  });
  
  export default connect(mapStateToProps, { diffselection,  tourselection, distanceselection, elevationselection, durationselection})(DiffSelector);