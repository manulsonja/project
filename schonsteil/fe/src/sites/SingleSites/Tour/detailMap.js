import {MapContainer, Map, Marker, Popup, TileLayer, Polyline  } from "react-leaflet";
import './map.css'
import L from "leaflet";
import { connect } from 'react-redux'
import { MEDIA_URL } from "../../../SETTINGS";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const icon = L.icon({
  iconUrl: MEDIA_URL + '/media/cat.png',
  iconSize: [32,32],
  iconAnchor: [16,32]
});

const make_polyline = (track, index) => {
  if (track ) {
    const json_track = JSON.parse(track)
    const polyline = json_track.coordinates
    const position = [47.259659,11.400375] 
    const marker_pos = json_track.coordinates[index]
    const bounds = L.latLngBounds(polyline.map((c) => { 
      return [c[0], c[1]]; 
    }));
    return (
      < MapContainer bounds={bounds} scrollWheelZoom={false}>
            <Marker position={marker_pos} icon={icon}></Marker> 
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
          <Polyline color="red" positions={polyline} />

      </MapContainer>
    
    )
 
  }
   
}
function DetailMap({props, d3index}) {
  const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const data  = props;
    const purpleOptions = { color: 'purple' }
    const polyline = make_polyline(data.posts.geojson_track, d3index)

return (
    <div className="outerMap" style={{"height" : `${(matches? 500 : 350)}px`}}>
      {polyline}
 

</div>  
)
}

const mapStateToProps = state => ({
  d3index: state.map.d3index,
})
export default connect(mapStateToProps, null)(DetailMap)