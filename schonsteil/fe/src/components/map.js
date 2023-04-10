import {MapContainer, Map, Marker, Popup, TileLayer } from "react-leaflet";
import './map.css'
import { useMap } from 'react-leaflet/hooks'
import { useMapEvent } from 'react-leaflet/hooks'
import L from "leaflet";
import { Link } from '@material-ui/core';


const icon = L.icon({
  iconUrl:'hiking.png',
  iconSize: [25,41],
  iconAnchor: [13,41]
});

export default function Leaflet(props) {
    const position = [47.259659,11.400375]
    const { data } = props;
    const generate_markers = (data) => {
      if ((!data || data.length === 0) ) return;
      return(data.map((datapoint) => {
        console.log(typeof datapoint.starting_pnt[0])
          return ( 
          <Marker position={[datapoint.starting_pnt[0],datapoint.starting_pnt[1]]} icon={icon}>
             <Popup><Link
									href={'tour/'+datapoint.tourtype+'/'+datapoint.slug}>
           
            
              {datapoint.title} <br /> {datapoint.image}
            </Link>
            </Popup>

          </Marker>)
      }))
    
    }

    function MyComponent() {
      const map = useMap()
      console.log('map center:', map.getBounds())
      return null
    }
    function MyComponentTwo() {
      const map = useMapEvent('zoomanim', () => {
        console.log(map.getBounds())
      })
      return null
    }
    function MyComponentThree() {
      const map = useMapEvent('mouseup', () => {
        console.log(map.getBounds())
      })
      return null
    }
  
return (
    <div className="outerMap" style={{"height" : "500px"}}>
  <MapContainer center={position} zoom={11} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

{generate_markers(data)}

 
    <MyComponent />
    <MyComponentTwo />
    <MyComponentThree />



  </MapContainer>
 

</div>  
)
}