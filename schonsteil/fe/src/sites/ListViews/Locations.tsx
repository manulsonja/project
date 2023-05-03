
import React from 'react'
import ListPage from './ListPage.tsx'
import Drawer from '@mui/material/Drawer';
import { makeStyles } from '@material-ui/core';
import LocationSidebar from './components/LocationSidebar.tsx';
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
  <LocationSidebar/> 
  </Drawer>
  )
}
const Locations = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
   const classes = useStyles()
  return (
    <React.Fragment>
        {(matches? <RenderSidebar/> : null)}
      <ListPage props={{'url':'parking/', 'type':'parking'}}/>
      {(!matches?  <MobileMenuWrapper props={{'touroption': false, 'hutoption': false, 'locationoption': true, 'static':true}}/> : null)}
    </React.Fragment>
  )
}

export default Locations