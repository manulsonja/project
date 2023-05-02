import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core';
import MuiToggleButton from "@mui/material/ToggleButton";
import { connect } from 'react-redux';
import { huttypeselection } from '../../../actions/map';


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



const HutSidebar = ({huttype, huttypeselection}) => {

const cat_arr = ['Huette','Alm','Gasthof']
const buttons = ['huette.jpeg','alm.jpeg','gh.jpeg']

const classes = useStyles();

function ToggleImage(data) {
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
    huttype: state.map.huttype,
    hardness: state.map.difficulty,
    searchphrase: state.map.searchstring,
  
  });
  export default connect(mapStateToProps, { huttypeselection })(HutSidebar);