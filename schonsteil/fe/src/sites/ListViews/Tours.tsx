
import React from 'react'
import ListPage from './ListPage.tsx'
import Drawer from '@mui/material/Drawer';
import Sidebar from './components/Toursidebar.tsx';
import { makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import MobileMenuWrapper from '../Map/components/MobileMenuWrapper.tsx';

const drawerWidth = 150;
const useStyles = makeStyles((theme) => ({	

	sideBar: {
		backgroundColor: '#272727',
	}
}));
const RenderSidebar = () => {
    const classes = useStyles()

    return(
        <Drawer
        className={classes.sideBar}
        sx={{
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
        backgroundColor: '#272727',
    
      },
    }}
    variant="permanent"
    anchor="left"
    > 
    <Sidebar/> 
    </Drawer>
    )
}
const Tours = ({tourtype, hardness, distance, duration, elevation, reload_state}) => {
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    const [url, setUrl] = React.useState('touren/touren/')
    useEffect(() => {   
      console.log(tourtype)

        if(tourtype.length==0 && hardness.length==0 && !distance) setUrl('touren/touren/');
        else {
            const qs = '/touren/touren/?tourtypes='+tourtype+'&search=&diff='+hardness+'&dist='+distance+'&dur='+duration+'&ele='+elevation;           
            setUrl(qs);
        } 
      },[reload_state, tourtype, hardness]);
  
  return (
    <React.Fragment>
        {(matches? <RenderSidebar/> : null)}
        <ListPage props={{'url':url, 'type':'tour'}}/>
        {(!matches?  <MobileMenuWrapper props={{'touroption': true, 'hutoption': false, 'locationoption': false, 'static': true}}/> : null)}
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
    tourtype: state.map.tourtype,
    hardness: state.map.difficulty,
    distance: state.map.distance,
    duration: state.map.duration,
    elevation: state.map.elevation,
    reload_state: state.map.reload_state,
  });
export default connect(mapStateToProps)(Tours);