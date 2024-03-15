import "./marker.css";
import "leaflet/dist/leaflet.css";
import { Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";
import React from "react";
import axios from "axios"; 
import { URL_LIVELLO } from "../../apis/api";


export default function Markers(props){
    const [markers, setMarkers] = React.useState([]);
    const [loading, setLoading] = React.useState(false); 

    // create custom icon
    const customIcon = new Icon({
        iconUrl: require("../../assets/icons/placeholder.png"),
        iconSize: [38, 38] // size of the icon
    });

    // custom cluster icon
    const createClusterCustomIcon = function (cluster) {
        return new divIcon({
        html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
        className: "custom-marker-cluster",
        iconSize: point(33, 33, true)
        });
    };

    React.useEffect(() => {
        const loadPost = async () => { 
            setLoading(true); 
  
            const response = await axios.get( 
                props.URL
            ); 
  
            console.log(response.data)
            setMarkers(response.data.map(sensor => {
                return {
                    geocode: [sensor.latDDN, sensor.lonDDE],
                    popUp: "Hello, I am pop up 3"
                }                
            }))

            console.log(response.data); 
            setLoading(false); 
        }; 
  
        // Call the function 
        loadPost();
    }, [])

    return (
        loading ? 
        (<h4>Loading...</h4>) :
        <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
        >
        {markers.map((marker) => (
            <Marker position={marker.geocode} icon={customIcon}>
              <Popup>{marker.popUp}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
    )
}