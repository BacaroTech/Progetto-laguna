import "../../styles.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import Markers from "../marker/markerComponent";

export default function Map() {
  return (
    <MapContainer center={[45.365362, 12.366722]} zoom={11}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Markers></Markers>
    </MapContainer>
  );
}
