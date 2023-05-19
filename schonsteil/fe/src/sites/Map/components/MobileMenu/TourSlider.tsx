import * as React from 'react';
import { connect } from 'react-redux';
import {  diffselection, 
          tourselection, 
          durationselection, 
          distanceselection, 
          elevationselection, 
          sliderreload } from '../../../../actions/map';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HeightIcon from '@mui/icons-material/Height';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';


const TourSlider = ({duration, 
                    distance, 
                    reload_state, 
                    sliderreload,
                    duration_max, 
                    distance_max, 
                    elevation_max,
                    elevation,
                    distanceselection,
                    elevationselection,
                    durationselection,
                    tourtype}) => {

  return (

    <React.Fragment>
       
     {(!distance_max? <h2>KEINE TOUREN</h2>: 
     <div>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center"> 
        <AccessTimeIcon />
        <Slider
        value={duration}
        max={duration_max}
        aria-label="Small"
        valueLabelDisplay="auto"
        onChange={(event: Event, newValue: number | number[]) => {
        durationselection(newValue as number[])
        }}
        onChangeCommitted={()=>{ sliderreload(!reload_state)}}
      /> 

      </Stack>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center"> 
        <SettingsEthernetIcon />
        <Slider
        value={distance}
        max={distance_max}

        aria-label="Small"
        valueLabelDisplay="auto"
        onChange={(event: Event, newValue: number | number[]) => {
          distanceselection(newValue as number[])
        }}
        onChangeCommitted={()=>{ sliderreload(!reload_state)}}

      /> 

      </Stack>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center"> 
        <HeightIcon />
        <Slider
        value={elevation}
        max={elevation_max}

        aria-label="Small"
        valueLabelDisplay="auto"
        onChange={(event: Event, newValue: number | number[]) => {
          elevationselection(newValue as number[])
        }}
        onChangeCommitted={()=>{ sliderreload(!reload_state)}}

      /> 

      </Stack>
     
     </div>)} 
      </React.Fragment>
  )
}

const mapStateToProps = state => ({
    tourtype: state.map.tourtype,
    hardness: state.map.difficulty,
    duration: state.map.duration,
    elevation: state.map.elevation,
    distance: state.map.distance,
    duration_max: state.map.duration_max,
    distance_max: state.map.distance_max,
    elevation_max: state.map.elevation_max,
    reload_state: state.map.reload_state,
  });
  
  export default connect(mapStateToProps, { diffselection, sliderreload, tourselection, distanceselection, elevationselection, durationselection})(TourSlider);