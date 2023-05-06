import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core';
import MuiToggleButton from "@mui/material/ToggleButton";
import { connect } from 'react-redux';
import { tourselection, diffselection, mapsearch } from '../../../actions/map';

const useStyles = makeStyles({
    
    buttonContainer: {
        float: 'left',
        height: '60px',
    },
    ButtonBox: {
        marginLeft: '15px',
        marginBottom: '15px',
    },
 })
 
 const ToggleButton = styled(MuiToggleButton)({
    width: 'calc(120px)',
    float: 'left',
    aspectRatio : '1 / 1',
    backgroundSize: '100%',
 
   "&.Mui-selected, &.Mui-selected:hover": {
     color: "white",
     border: '5px solid #EE0E79',
    }
 });

const Sidebar = ({tourtype, tourselection}) => {

const cat_arr = ['Wandern','Hochtour','Klettertour','Hike and Fly','Skitour']
const buttons = ['wd.jpeg','ht.jpeg','kl.jpeg','hikeandfly1.jpeg','st.jpeg']

const classes = useStyles();

function ToggleImage(data) {
    const   props  = data 
    const   style={...{[props.bgtype]:props.bg}}
    const   isIncluded = tourtype.includes(props.selectorItem)

    return (
        <Box className={classes.ButtonBox}>
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
        </Box>
      );
    }


  return (
    <React.Fragment>
    <div className={classes.buttonContainer}>  </div>

   { 
   cat_arr.map((item, i) => {
            const bgurl = `url("${process.env.REACT_APP_API_URL}/media/${buttons[i]}")`
           return(ToggleImage({'selectorItem':item, 'bg':bgurl, 'bgtype':"backgroundImage"}))

     }
    
  )}
  
  
  </React.Fragment>
  )
    }

    const mapStateToProps = state => ({
    tourtype: state.map.tourtype,
    hardness: state.map.difficulty,
    searchphrase: state.map.searchstring,
  
  });
  export default connect(mapStateToProps, { diffselection, mapsearch, tourselection })(Sidebar);