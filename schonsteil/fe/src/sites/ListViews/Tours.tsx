import React from 'react'
import Drawer from '@mui/material/Drawer';
import Sidebar from './components/Toursidebar.tsx';
import { makeStyles } from '@material-ui/core';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import MobileMenuWrapper from '../Map/components/MobileMenuWrapper.tsx';
import ListPagePost from './ListPagePost.tsx';

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
const Tours = () => {
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
  
  return (
    <React.Fragment>
        {(matches? <RenderSidebar/> : null)}
        <ListPagePost props={{'type': 'tour'}}/>
        {(!matches?  <MobileMenuWrapper props={{'touroption': true, 'hutoption': false, 'locationoption': false, 'static': true}}/> : null)}
    </React.Fragment>
  )
}

export default Tours;