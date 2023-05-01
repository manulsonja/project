import React from 'react'
import ListPage from './listView.tsx'
import Drawer from '@mui/material/Drawer';
import { makeStyles } from '@material-ui/core';
import HutSidebar from './components/HutSidebar.tsx';


const drawerWidth = 150;
const useStyles = makeStyles((theme) => ({	

	sideBar: {
		backgroundColor: '#272727',

	}
}));

const Huts = () => {
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
<HutSidebar/> 
</Drawer>
    <ListPage props={{'url':'huts/', 'type':'hut'}}/>
    </React.Fragment>
  )
}

export default Huts