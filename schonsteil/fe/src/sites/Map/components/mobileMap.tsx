import React, {useEffect} from 'react';
import '../../../App.css';
import Leaflet from './LeafletMap';
import { connect } from 'react-redux';
import MobileMenuWrapper from './MobileMenuWrapper.tsx';

function MobileMap({ props, difficulty, tourtype, sstring}) {

   const appState = props.appState
   const screenSize = props.screenSize 
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
                <Leaflet props={{'state' : appState,'huts':hutState.huts, 'locations': locationState.locations, 'screen': screenSize, 'offset':200}}/>
            </div>
            </div>     
      <MobileMenuWrapper props={{'touroption': true, 'hutoption': true, 'locationoption': true}}/>     
</React.Fragment>
)
}

const mapStateToProps = state => ({
    difficulty: state.map.difficulty,
    tourtype: state.map.tourtype,
    sstring: state.map.searchstring,
});
export default connect(mapStateToProps,  null )(MobileMap);

