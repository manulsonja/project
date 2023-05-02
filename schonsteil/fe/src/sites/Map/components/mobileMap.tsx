import React, {useEffect} from 'react';
import '../../../App.css';
import Leaflet from './LeafletMap';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import TuneIcon from '@mui/icons-material/Tune';
import Button from '@mui/material/Button';
import { resetselection, tourselection, diffselection, mapsearch } from '../../../actions/map';
import { connect } from 'react-redux';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@mui/material/Chip';

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

function MobileMap({resetselection, props, difficulty, tourtype, sstring, diffselection, tourselection, searchstring}) {
   const classes = useStyles()
   const appState = props.appState
   const screenSize = props.screenSize 
   const toggle = props.toggleDrawer
   const hutState = props.hutState
   const locationState = props.locationState

   useEffect(() => {   
    console.log(difficulty)
        console.log((difficulty.length===0))
    },[difficulty, tourtype, sstring]);


   return(
        <React.Fragment>			
            <div className='outerBox'>
                <div className='leftColumn' style={{width:'100%'}}>
                <Leaflet data={{'state' : appState,'huts':hutState.huts, 'locations': locationState.locations, 'screen': screenSize, 'offset':140}}/>
            </div>
            </div>

        <Box className={classes.filterChips}>
     {(difficulty.length===0)? null :  <Chip label="Anspruch" onDelete={() => {diffselection([])}} />  }
     {(tourtype.length===0)? null : <Chip label="Tourtyp" onDelete={() => {tourselection([])}}/>  }
     {(sstring==="")? null :       <Chip label="Suche" onDelete={() => {searchstring('')}} />
  }  
        </Box>
        <AppBar position="static">
        <Toolbar>
            <Typography variant='h2'>
            <Button 
                    variant="contained"
                    onClick={toggle("bottom", true)}
                    style={{backgroundColor:'#EE0E79'}}
                    startIcon={<TuneIcon />}>
                FILTER
            </Button>
            </Typography>
            <Typography variant='h2'>
            <Button 
                    variant="contained"
                    style={{backgroundColor:'#EE0E79'}}
                    onClick={() => { resetselection()}}
                    endIcon={<RestartAltIcon />}>
                Reset
            </Button>
            </Typography>
            </Toolbar>
        </AppBar>

</React.Fragment>
)
};

const mapStateToProps = state => ({
    difficulty: state.map.difficulty,
    tourtype: state.map.tourtype,
    sstring: state.map.searchstring,
});
export default connect(mapStateToProps, { resetselection, tourselection, diffselection, mapsearch })(MobileMap);

