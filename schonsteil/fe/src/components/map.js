import {MapContainer, Map, Marker, Popup, TileLayer } from "react-leaflet";
import './map.css'
import { useMap } from 'react-leaflet/hooks'
import { useMapEvent } from 'react-leaflet/hooks'
import L from "leaflet";
import { Link } from '@material-ui/core';
import { MEDIA_URL } from "../SETTINGS";


const icon = L.icon({
  iconUrl:'hiking.png',
  iconSize: [25,41],
  iconAnchor: [13,41]
});

export default function Leaflet(props) {

    const position = [47.259659,11.400375]
    const { data } = props;
    const screen = data[1];
    const tours = data[0];
    const generate_markers = (tours) => {
      if ((!tours.posts || tours.posts.length === 0) ) return;
      return(tours.posts.map((datapoint) => {
          return ( 
          <Marker position={[datapoint.starting_pnt[0],datapoint.starting_pnt[1]]} icon={icon} key={datapoint.id+"marker"}>
             <Popup><Link 
									href={'tour/'+datapoint.tourtype+'/'+datapoint.slug}>    
                    <div className="markerLink" key={datapoint.id+"markerLink"}>{datapoint.title} </div>       
              <img src={MEDIA_URL + datapoint.image.ratios['16/9'].sources['image/jpeg']['200']} className="markerImage"/>             
            </Link>
            </Popup>
          </Marker>)
      }))  
    }
    const resize = (screen) => {
      if ((!screen || screen.length === 0) ) return;
      return (screen.height-120)
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
  <div className="outerMap"  
      style={{height:  resize(screen) }} 
      key={"outerMapContainer"} >
  <MapContainer center={position} zoom={11} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" />   
          {generate_markers(tours)}
    <MyComponent />
    <MyComponentTwo />
    <MyComponentThree />
  </MapContainer>
</div>  
)}


/*     https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png
https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"
https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png
https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png
 */