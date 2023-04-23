import {MapContainer, Map, Marker, Popup, TileLayer, Polyline  } from "react-leaflet";
import './map.css'
import L from "leaflet";

const icon = L.icon({
  iconUrl:'hiking.png',
  iconSize: [25,41],
  iconAnchor: [13,41]
});

const make_polyline = (track) => {
  if (track ) {
    const json_track = JSON.parse(track)
    const polyline = json_track.coordinates
    const position = [47.259659,11.400375] 
    const bounds = L.latLngBounds(polyline.map((c) => { 
      return [c[0], c[1]]; 
    }));
    return (
      < MapContainer bounds={bounds} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
          <Polyline color="red" positions={polyline} />

      </MapContainer>
    
    )
 
  }
   
}
export default function DetailMap(props) {
    const { data } = props;
    const purpleOptions = { color: 'purple' }
    const polyline = make_polyline(data.posts.geojson_track)

return (
    <div className="outerMap" style={{"height" : "500px"}}>
  {polyline}
 

</div>  
)
}