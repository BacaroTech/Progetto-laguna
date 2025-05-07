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

    // create custom marker icon
    const createMarkerStyle = () => {
        switch (props.type) {
            case "Livello idrologico":
                return new Icon({
                    iconUrl: require("../../assets/icons/livelloIdrico.png"),
                    iconSize: [38, 38] // size of the icon
                })
            case "Livello pressione":
                return new Icon({
                    iconUrl: require("../../assets/icons/pressione.png"),
                    iconSize: [38, 38] // size of the icon
                })  
            case "Temperatura acqua":
                return new Icon({
                    iconUrl: require("../../assets/icons/temperaturaAcqua.png"),
                    iconSize: [38, 38] // size of the icon
                }) 
            case "Temperatura aria":
                return new Icon({
                    iconUrl: require("../../assets/icons/temperaturaAria.png"),
                    iconSize: [38, 38] // size of the icon
                })  
            case "Umidità":
                return new Icon({
                    iconUrl: require("../../assets/icons/umidita.png"),
                    iconSize: [38, 38] // size of the icon
                })        
            default:
                return new Icon({
                    iconUrl: require("../../assets/icons/placeholder.png"),
                    iconSize: [38, 38] // size of the icon
                })
        }
        
    }

    //create marker
    const createMarker = (sensor) => {
        switch (props.type) {
            case "Livello idrologico":
                return {
                    geocode: [sensor.latDDN, sensor.lonDDE],
                    popUp: "Livello idrico: " + sensor.valore
                } 
            case "Livello pressione":
                return {
                    geocode: [sensor.latDDN, sensor.lonDDE],
                    popUp: "Livello pressione: " + sensor.valore
                }  
            case "Temperatura acqua":
                return {
                    geocode: [sensor.latDDN, sensor.lonDDE],
                    popUp: "Temperatura acqua: " + sensor.valore
                } 
            case "Temperatura aria":
                return {
                    geocode: [sensor.latDDN, sensor.lonDDE],
                    popUp: "Temperatura aria: " + sensor.valore
                }  
            case "Umidità":
                return {
                    geocode: [sensor.latDDN, sensor.lonDDE],
                    popUp: "Umidità: " + sensor.valore
                }        
            default:
                return {
                    geocode: [sensor.latDDN, sensor.lonDDE],
                    popUp: "pop up generico"
                } 
        }
    }

    // custom cluster icon
    const createClusterCustomIcon = function (cluster) {
        return new divIcon({
        html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
        className: "custom-marker-cluster",
        iconSize: point(33, 33, true)
        });
    };

    const loadMarker = async () => { 
        setLoading(true); 

        const response = await axios.get( 
            props.URL
        ); 

        //console.log(response.data)
        setMarkers(response.data.map(sensor => {
            return createMarker(sensor);
                           
        }))

        //console.log(response.data); 
        setLoading(false); 
    };

    React.useEffect(() => {
        loadMarker();
    }, [])

    return (
        loading ? 
        (<h4>Loading...</h4>) :
        <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
        >
        {markers.map((marker) => (
            <Marker position={marker.geocode} icon={createMarkerStyle()}>
              <Popup>{marker.popUp}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
    )
}