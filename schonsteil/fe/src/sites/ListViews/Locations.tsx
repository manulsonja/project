
import React from 'react'
import ListPage from './listView.tsx'
import Drawer from '@mui/material/Drawer';
import { makeStyles } from '@material-ui/core';
import LocationSidebar from './components/LocationSidebar.tsx';

const drawerWidth = 150;
const useStyles = makeStyles((theme) => ({	

	sideBar: {
		backgroundColor: '#272727',

	}
}));

const Locations = () => {
   const classes = useStyles()
  return (
    <React.Fragment>
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
<ListPage props={{'url':'parking/', 'type':'parking'}}/>
    </React.Fragment>
  )
}

export default Locations