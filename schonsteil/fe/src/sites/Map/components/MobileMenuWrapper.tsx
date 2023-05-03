import React from 'react';
import '../../../App.css';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import TuneIcon from '@mui/icons-material/Tune';
import Button from '@mui/material/Button';
import { resetselection, tourselection, diffselection, mapsearch } from '../../../actions/map';
import { connect } from 'react-redux';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Chip from '@mui/material/Chip';
import BottomNavigation from '@mui/material/BottomNavigation';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { makeStyles } from '@material-ui/core/styles';
import TourMenu from './MobileMenu/TourMenu.tsx';
import TourMenuStatic from './MobileMenu/TourMenuStatic.tsx';
import HutMenu from './MobileMenu/HutMenu.tsx';
import LocationMenu from './MobileMenu/LocationMenu.tsx';
import LocationMenuStatic from './MobileMenu/LocationMenuStatic.tsx';
import HutMenuStatic from './MobileMenu/HutMenuStatic.tsx';

const useStyles = makeStyles((theme) => ({
    search: {
        backgroundColor: 'white',
        maxWidth: 120,
        borderRadius: "10px",
        border: '0',
    },
    toolbarTitle: {
        flexGrow: 1,
        color: 'white',
        fontWeight: 700,
    },
    filterChips: {
        width: '100%',
        backgroundColor: 'white',
    },
    buttons: {
        margin: theme.spacing(1, 1.5), 
        color: 'white',
        borderColor: 'white',
    },
}));
function MobileMenuWrapper({resetselection, props, difficulty, tourtype, sstring, diffselection, tourselection, searchstring}) {
    const classes = useStyles()
    const touroption = props.touroption
    const locationoption = props.locationoption
    const hutoption = props.hutoption 
    const staticoptions = props.static

    const list = (anchor: Anchor) => (
        <Box
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
          role="presentation"
          onKeyDown={toggleDrawer(anchor, false)}
        >  
       {   (locationoption ? (staticoptions? <LocationMenuStatic/>: <LocationMenu /> )   :      null)  }
       {   (hutoption ? (staticoptions? <HutMenuStatic/>: <HutMenu /> )      :      null)  }
       {   (touroption ? (staticoptions? <TourMenuStatic/>: <TourMenu /> )   :      null)  }
       
        </Box>
    );
    const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});
    const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event &&
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
        ) {
        return;
      }
        setState({ ...state, [anchor]: open });
      };
  return (
    <React.Fragment>
    <div>		
    <SwipeableDrawer
    anchor={"bottom"}
    open={state["bottom"]}
    onClose={toggleDrawer('bottom', false)}
    onOpen={toggleDrawer('bottom', true)}
    >			
    {list("bottom")}
    </SwipeableDrawer>
    </div>
     <Box className={classes.filterChips}>
     {(difficulty.length===0)? null :  <Chip label="Anspruch" onDelete={() => {diffselection([])}} />  }
     {(tourtype.length===0)? null : <Chip label="Tourtyp" onDelete={() => {tourselection([])}}/>  }
     {(sstring==="")? null :       <Chip label="Suche" onDelete={() => {searchstring('')}} />
}  
 </Box>
 <BottomNavigation
 sx={{width:'100%', position:'fixed', bottom: 0, backgroundColor:'#EE0E79',
 "& .MuiBottomNavigationAction-root, .Mui-selected, svg": {
     color: "white"
   }}}
>
  <AppBar position="static">
 <Toolbar sx={{ justifyContent: "space-between" }}>   
     <Button 
            
            variant="contained"
            onClick={toggleDrawer("bottom", true)}
            style={{backgroundColor:'#EE0E79'}}
            startIcon={<TuneIcon />}>
                <Typography variant='h8'> FILTER 
                </Typography>
      </Button>
      <Button 
             variant="contained"
             style={{backgroundColor:'#EE0E79'}}
             onClick={() => { resetselection()}}
             endIcon={<RestartAltIcon />}>
     <Typography variant='h8'>
         Reset
     </Typography>
     </Button>
     </Toolbar>
 </AppBar>  
</BottomNavigation>
</React.Fragment>  	
  )
}

const mapStateToProps = state => ({
    difficulty: state.map.difficulty,
    tourtype: state.map.tourtype,
    sstring: state.map.searchstring,
});
export default connect(mapStateToProps, { resetselection, tourselection, diffselection, mapsearch })(MobileMenuWrapper);

