import * as React from 'react';
import { connect } from 'react-redux';
import { diffselection, mapsearch, tourselection, huttypeselection, locationselection } from '../../../../actions/map';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core';
import MuiToggleButton from "@mui/material/ToggleButton";
import { ListItem, Typography } from '@mui/material';
import { List } from '@mui/material';

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


const HutMenuStatic = ({ huttype, huttypeselection}) => {

  const hut_arr = ['huette','alm','gasthof']
  const hutbuttons = ['huette.jpeg','alm.jpeg','gasthof.jpeg']
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
        const bgurl = `url("${process.env.REACT_APP_API_URL}/media/ressources/navButtons/${icons[i]}")`
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

  return (
    <React.Fragment>
      <List>     
        <ListItem divider onClick={() => {setCollapsed({...opened, huts: !opened.huts})}}> 
        <Typography variant="h6">Huetten</Typography>
        </ListItem>
        {ToggleIconMenu(hut_arr, hutbuttons, huttype, huttypeselection)}
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

export default connect(mapStateToProps, { diffselection, mapsearch, tourselection, huttypeselection, locationselection })(HutMenuStatic);