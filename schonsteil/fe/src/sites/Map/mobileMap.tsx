import React from 'react';
import '../../App.css';
import Leaflet from '../../components/LeafletMap';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import TuneIcon from '@mui/icons-material/Tune';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { resetselection } from '../../actions/map';
import { connect } from 'react-redux';

function MobileMap({resetselection, props}) {
   const appState = props.appState
   const screenSize = props.screenSize 
   const toggle = props.toggleDrawer
    return(
        <React.Fragment>			
            <Box sx={{ flexGrow: 1 }}>	
            </Box>
            <div className='outerBox'>
                <div className='leftColumn' style={{width:'100%'}}><Leaflet data={{'state' : appState, 'screen': screenSize, 'offset':112}}/></div>
            </div>
        <AppBar position="static">
            <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggle("bottom", true)}
            >
              <MenuIcon />
            </IconButton>
            <TuneIcon/>	
            <Typography variant='h2'>
            <Button variant="contained"
                    onClick={() => { resetselection()}}
                    endIcon={<SendIcon />}>
                Send
            </Button>
            </Typography>
            </Toolbar>
        </AppBar>
</React.Fragment>
)
};

export default connect(null, { resetselection })(MobileMap);

