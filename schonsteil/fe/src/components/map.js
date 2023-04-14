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

export default function Leaflet(props, screen) {
    const position = [47.259659,11.400375]
    const { data } = props;
    const generate_markers = (data) => {
      if ((!data.posts || data.posts.length === 0) ) return;
      return(data.posts.map((datapoint) => {
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
    const resize = (data) => {
      if ((!data.screenSize || data.screenSize.length === 0) ) return;
      console.log(data.screenSize.height)
      return (data.screenSize.height-120)

    }
    function MyComponent() {
      const map = useMap()
      return null
    }
    function MyComponentTwo() {
      const map = useMapEvent('zoomanim', () => {
      })
      return null
    }
    function MyComponentThree() {
      const map = useMapEvent('mouseup', () => {
      })
      return null
    }
  
return (
  <div className="outerMap"  style={{height:  resize(data)
  }} 
  >
  <MapContainer center={position} zoom={11} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
    />
{/*     https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png
https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"
 */}    
{generate_markers(data)}

 
    <MyComponent />
    <MyComponentTwo />
    <MyComponentThree />



  </MapContainer>
 

</div>  
)
}