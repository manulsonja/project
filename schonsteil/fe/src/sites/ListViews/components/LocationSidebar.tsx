import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core';
import MuiToggleButton from "@mui/material/ToggleButton";
import { connect } from 'react-redux';
import { locationselection } from '../../../actions/map';


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



const LocationSidebar = ({locationtype, locationselection}) => {

const cat_arr = ['Huette','Alm','Gasthof']
const buttons = ['wd.jpeg','ht.jpeg','kl.jpeg']

const classes = useStyles();

function ToggleImage(data) {
    const  props  = data 
    let style={...{[props.bgtype]:props.bg}}
    let isIncluded = locationtype.includes(props.selectorItem)

    return (
        <Box className={classes.ButtonBox}>
        <ToggleButton
          style={style}
          value="check"
          selected={isIncluded}
          onChange={() => {
            if(isIncluded){
              const array = locationtype              
              locationselection(array.filter(a => a !== props.selectorItem))

            }
            else {
              locationselection(locationtype.concat(props.selectorItem));
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
            let bgurl = `url("${process.env.REACT_APP_API_URL}/media/${buttons[i]}")`
           return(ToggleImage({'selectorItem':item, 'bg':bgurl, 'bgtype':"backgroundImage"}))
     } 
  )}</React.Fragment>
  )
    }

    const mapStateToProps = state => ({
    locationtype: state.map.locationtype,
   
  
  });
  export default connect(mapStateToProps, { locationselection })(LocationSidebar);