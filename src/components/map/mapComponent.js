import "../../styles.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import Markers from "../marker/markerComponent";
import { URL_LIVELLO, URL_PRESSIONE, URL_TEMP_ACQUA, URL_TEMP_ARIA, URL_UMIDITA } from "../../apis/api";

export default function Map() {

  let MapLayerNameURLSpacial = [
    ["Livello idrologico", URL_LIVELLO, true],  
    ["Livello pressione", URL_PRESSIONE, false],  
    ["Temperatura acqua", URL_TEMP_ACQUA, false],
    ["Temperatura aria", URL_TEMP_ARIA, false],
    ["Umidità", URL_UMIDITA, false]
  ]

  return (
    <MapContainer center={[45.365362, 12.366722]} zoom={11}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LayersControl position="topright"  >
        {MapLayerNameURLSpacial.map(layerMap => 
        layerMap[2] ? 
        <LayersControl.Overlay name={layerMap[0]} checked>
          <Markers URL={layerMap[1]} type={layerMap[0]}></Markers>
        </LayersControl.Overlay> :
        <LayersControl.Overlay name={layerMap[0]}>
        <Markers URL={layerMap[1]} type={layerMap[0]}></Markers>
      </LayersControl.Overlay> 
        )}
      </LayersControl>
    </MapContainer>
  );
}
