import "./marker.css";
import "leaflet/dist/leaflet.css";
import { Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";
import React from "react";
import axios from "axios"; 


export default function Markers(){
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
            // Till the data is fetch using API 
            // the Loading page will show. 
            setLoading(true); 
  
            // Await make wait until that 
            // promise settles and return its result 
            const response = await axios.get( 
                "https://dati.venezia.it/sites/default/files/dataset/opendata/livello.json"
            ); 
  
            console.log(response.data)
            setMarkers(response.data.map(sensor => {
                return {
                    geocode: [sensor.latDDN, sensor.lonDDE],
                    popUp: "Hello, I am pop up 3"
                }                
            }))

            // After fetching data stored it in posts state. 
            console.log(response.data); 
  
            // Closed the loading page 
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