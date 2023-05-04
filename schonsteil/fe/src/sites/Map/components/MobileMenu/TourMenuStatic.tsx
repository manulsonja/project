import * as React from 'react';
import { connect } from 'react-redux';
import { diffselection, tourselection, durationselection, distanceselection, elevationselection} from '../../../../actions/map';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core';
import MuiToggleButton from "@mui/material/ToggleButton";
import { ListItem, Typography } from '@mui/material';
import { List } from '@mui/material';
import TourSlider from './TourSlider.tsx';

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

const TourMenuStatic = ({ diffselection, 
                    tourselection,
                    durationselection,
                    distanceselection,
                    elevationselection,
                    tourtype, 
                    hardness, 
                    elevation, 
                    duration, 
                    distance,
                    distance_max,
                    duration_max,}) => {

  const tour_arr = ['Wandern','Hochtour','Klettertour','Hike and Fly','Skitour']
  const tourbuttons = ['wd.jpeg','ht.jpeg','kl.jpeg','hikeandfly1.jpeg','st.jpeg']
  const diff_arr = ['leicht', 'mittel', 'schwierig']
  const diff_colors = ['blue', 'red', 'black']
  const useStyles = makeStyles({
      buttonRow: {
        width: '100%',
        float: 'left',
      },
 })
 const classes = useStyles();

 function ToggleIconMenu(array, icons, state, action) {
  return(
    <div className={classes.buttonRow}>
      {array.map((item, i) => {
        const bgurl = `url("${process.env.REACT_APP_API_URL}/media/${icons[i]}")`
        const style={...{["backgroundImage"]:bgurl}}
        const isIncluded = state.includes(item)
        return(
          <ToggleButton
            style={style}
            value="check"
            selected={isIncluded}
            onChange={() => {
              if(isIncluded){
                const array = state              
                action(array.filter(a => a !== item))
              }
              else {
                action(state.concat(item));
              }
            }}
          >
          </ToggleButton>
        );
      })}
    </div>
  )
 }


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
    <React.Fragment>
      <List>
        <ListItem>
        <Typography variant="h6">Touren</Typography>
        </ListItem>

        {ToggleIconMenu(tour_arr, tourbuttons, tourtype, tourselection)}     
            {diff_arr.map((item,i) => {
            const color = diff_colors[i]
                return(ToggleDiff({
                                    'selectorItem':item, 
                                    'bg':color, 
                                    'bgtype':"backgroundColor",
                                    'styleOverrides': `width:'200px'`,
                                  }))
            })}
      <div style={{width: '85%', marginLeft: '6%'}}>
            <TourSlider/>
       </div>
      </List>
     
 
  </React.Fragment>
  )
}

const mapStateToProps = state => ({
  tourtype: state.map.tourtype,
  hardness: state.map.difficulty,
  duration: state.map.duration,
  elevation: state.map.elevation,
  distance: state.map.distance,
  duration_max: state.map.duration_max,
  distance_max: state.map.distance_max,
});

export default connect(mapStateToProps, { diffselection,  tourselection, distanceselection, elevationselection, durationselection})(TourMenuStatic);