import * as React from 'react';
import { connect } from 'react-redux';
import { diffselection, mapsearch, tourselection, huttypeselection, locationselection } from '../../../../actions/map';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core';
import MuiToggleButton from "@mui/material/ToggleButton";
import { ListItem, Typography } from '@mui/material';
import { Collapse } from '@mui/material';
import { List } from '@mui/material';
import Slider from '@mui/material/Slider';

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

const Tourmenu = ({diffselection, tourselection, tourtype, huttype, huttypeselection, hardness, locationtype, locationselection}) => {
  const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
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
  const tour_arr = ['Wandern','Hochtour','Klettertour','Hike and Fly','Skitour']
  const tourbuttons = ['wd.jpeg','ht.jpeg','kl.jpeg','hikeandfly1.jpeg','st.jpeg']
  const diff_arr = ['leicht', 'mittel', 'schwierig']
  const diff_colors = ['blue', 'red', 'black']
  const [opened, setCollapsed] = React.useState({'locations': false, 'tours': true, 'huts': false})
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
        console.log(bgurl)
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
        <ListItem onClick={() => {setCollapsed({...opened, tours: !opened.tours})}}>
        <Typography variant="h6">Touren</Typography>
        {(!opened.tours?(tourtype.length==0? 'Alle ausgew.': tourtype.length+' ausgewaehlt'):null)}
        </ListItem>
        <Collapse in={opened.tours}>

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
      <div style={{width: '96%', marginLeft: '2%'}}>
      <Slider
        size="small"
        defaultValue={[0,20]}
        aria-label="Small"
        valueLabelDisplay="auto"
      /> 
      <Slider
        size="small"
        defaultValue={[0,20]}
        aria-label="Small"
        valueLabelDisplay="auto"
      /> 
         <Slider
        size="small"
        defaultValue={[0,20]}
        aria-label="Small"
        valueLabelDisplay="auto"
      /> 
       </div>
        </Collapse>
      </List>
     
 
  </React.Fragment>
  )
}

const mapStateToProps = state => ({
  tourtype: state.map.tourtype,
  hardness: state.map.difficulty,
  searchphrase: state.map.searchstring,
  huttype: state.map.huttype,
  locationtype: state.map.locationtype,
});

export default connect(mapStateToProps, { diffselection, mapsearch, tourselection, huttypeselection, locationselection })(Tourmenu);