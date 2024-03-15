import "../../styles.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import Markers from "../marker/markerComponent";
import { map } from "leaflet";
import { URL_LIVELLO, URL_ONDE_LAGUNA, URL_PRESSIONE, URL_VENTO } from "../../apis/api";

export default function Map() {

  let MapLayerNameURL = [
    ["Livello idrologico", URL_LIVELLO, true],  
    ["Livello pressione", URL_PRESSIONE, false],  
  ]

  return (
    <MapContainer center={[45.365362, 12.366722]} zoom={11}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LayersControl position="topright"  >
        {MapLayerNameURL.map(layerMap => 
        <LayersControl.Overlay name={layerMap[0]}>
          <Markers URL={layerMap[1]}></Markers>
        </LayersControl.Overlay>)}
      </LayersControl>
    </MapContainer>
  );
}
