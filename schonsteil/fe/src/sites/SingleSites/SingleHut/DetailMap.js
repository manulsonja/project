import {MapContainer, Map, Marker, Popup, TileLayer, Polyline  } from "react-leaflet";
import L from "leaflet";
import { MEDIA_URL } from "../../../SETTINGS";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const icon = L.icon({
  iconUrl: MEDIA_URL + '/media/cheesecake.png',
  iconSize: [32,32],
  iconAnchor: [16,32]
});


export default function DetailMap({position}) {
  const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('sm'));
const marker_pos=position
return (
  <div className="outerMap" style={{"height" : `${(matches? 500 : 400)}px`}}>
  <MapContainer center={position} zoom={15}>
       <Marker position={marker_pos} icon={icon}></Marker> 
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      </MapContainer> 

</div>  
)
}
