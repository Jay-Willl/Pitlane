import React from "react";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {Icon} from "leaflet";
// import * as parkData from "./data/skateboard-parks.json";
import "./App.css";


export const icon = new Icon({
    iconUrl: "",
    iconSize: [25, 25]
});

const position = [51.5, 0.0];

function App() {
    const [track, setTrack] = React.useState(null);
    return (
        <MapContainer center={position} zoom={12} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    );
}

export default App;











