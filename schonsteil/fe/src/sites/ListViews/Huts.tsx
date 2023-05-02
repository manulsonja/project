import React from 'react'
import ListPage from './listView.tsx'
import Drawer from '@mui/material/Drawer';
import { makeStyles } from '@material-ui/core';
import HutSidebar from './components/HutSidebar.tsx';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { connect } from 'react-redux';
import { useEffect } from 'react';

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
<HutSidebar/> 
  </Drawer>
  )
}
const Huts = ({huttype}) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const [url, setUrl] = React.useState('huts/')
  useEffect(() => {   
      if(huttype.length==0) setUrl('huts/');
      else {
          const qs = '/huts/?huttypes='+huttype;           
          setUrl(qs.toLocaleLowerCase());
      } 
    },[huttype]);

   const classes = useStyles()
  return (
    <React.Fragment>
      {(matches? <RenderSidebar/> : null)}
    <ListPage props={{'url':url, 'type':'hut'}}/>
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
    huttype: state.map.huttype,
  
  
  });
export default connect(mapStateToProps)(Huts);