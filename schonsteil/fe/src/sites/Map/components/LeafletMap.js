import {MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import './map.css'
import { useMap } from 'react-leaflet/hooks'
import { useMapEvent } from 'react-leaflet/hooks'
import L from "leaflet";
import { Link } from '@material-ui/core';
import { MEDIA_URL } from "../../../SETTINGS";
import { connect } from "react-redux";
import { setmapbounds } from "../../../actions/map";
import { useEffect } from "react";

const icon = L.icon({
  iconUrl: MEDIA_URL + '/media/marker.png',
  iconSize: [25,41],
  iconAnchor: [13,41]
});
const hutIcon = L.icon({
  iconUrl: MEDIA_URL + '/media/hut.png',
  iconSize: [32,32],
  iconAnchor: [16,32]
});
const omIcon = L.icon({
  iconUrl: MEDIA_URL + '/media/om.jpeg',
  iconSize: [32,30],
  iconAnchor: [16,30]
});


const renderTourMarker = (tours) => {
  if(!tours) return null;
  return(
    tours.map((tour) =>{
      try {
        const lat = tour.starting_pnt[0]
        const lon = tour.starting_pnt[1]
        const img = tour.image.ratios['16/9'].sources['image/jpeg']['200']

        return(
          <Marker position={[lat, lon]} icon={icon} key={tour.id+"marker"}>
             <Popup><Link 
									href={'tour/'+tour.tourtype+'/'+tour.slug}>    
                    <div className="markerLink" key={tour.id+"markerLink"}>{tour.title} </div>       
              <img src={process.env.REACT_APP_API_URL + img} className="markerImage"/>             
            </Link>
            </Popup>
          </Marker> 
        )
      }
      catch {
        console.log("error; couldnt render tour marker. please check input data for validity and completeness.")
      }
    })
  )
}
const renderHutMarker = (huts) => {
  if(!huts) return null;
  return(
      huts.map((hut) => {
        try{
          const lat = hut.position[0];
          const lon = hut.position[1];
          const img = hut.image.ratios['16/9'].sources['image/jpeg']['200'];
          return(
            <Marker position={[lat,lon]} icon={hutIcon} key={hut.id+"marker"}>
            <Popup><Link 
                 href={'hut/'+hut.slug}>    
                   <div className="markerLink" key={hut.id+"markerLink"}>{hut.name} </div>       
                   <img src={process.env.REACT_APP_API_URL + img} className="markerImage"/>             
           </Link>
           </Popup>
          </Marker>
          )

        }
        catch {
          console.log("error; couldnt render hut marker. please check input data for validity and completeness.")
        }
      })
  )
}
const renderLocationMarker = (locations) => {
  if(!locations) return null;
  return(
      locations.map((location) => {
        try{
          const lat = location.position[0];
          const lon = location.position[1];
          const img = location.image.ratios['16/9'].sources['image/jpeg']['200'];
          return(
            <Marker position={[lat,lon]} icon={omIcon} key={location.id+"marker"}>
            <Popup><Link 
                 href={'parking/'+location.slug}>    
                   <div className="markerLink" key={location.id+"markerLink"}>{location.name} </div>       
                   <img src={process.env.REACT_APP_API_URL + img} className="markerImage"/>             
           </Link>
           </Popup>
          </Marker>
          )

        }
        catch {
          console.log("error; couldnt render hut marker. please check input data for validity and completeness.")
        }
      })
  )
}
function Leaflet({ props, offset, setmapbounds}) {
    const height_offset = offset + 112 + props.offset
    const position = [47.259659,11.400375]
    const screen = props.screen;
    const tours = props.state.posts;
    const huts = props.huts
    const locations = props.locations

    const resize = (screen) => {
      if ((!screen || screen.length === 0) ) return;
      return (screen.height- height_offset)
    }
    
    function MyComponent() {
      const map = useMap()
      
      const bounds = map.getBounds()
      useEffect(() =>{
        console.log('dfdf')
      },[])
      return null
    }
    function MyComponentTwo() {
      const map = useMapEvent('zoomend', () => { 
        const bounds = map.getBounds()
        setmapbounds(bounds)
      })
      return null
    } 
    function MyComponentThree() {
      const map = useMapEvent('dragend', () => { 
        const bounds = map.getBounds()
        setmapbounds(bounds)
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
          {renderTourMarker(tours)}
          {renderHutMarker(huts)}
          {renderLocationMarker(locations)}

    <MyComponent />
    <MyComponentTwo />

    <MyComponentThree />
  </MapContainer>
</div>  
)}
const mapStateToProps = state => ({
	offset: state.map.offset,
	});
export default connect(mapStateToProps, {setmapbounds})(Leaflet)

/*     https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png
https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"
https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png
https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png
 */