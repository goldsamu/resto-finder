import React from "react";
import { Marker, Popup } from "react-leaflet";

// Chaque Marker doit être appelé comme enfant du composant MapContainer
const FoundMarker = ({ lat, lon, message, action }) => {
  return (
    <Marker position={[lat, lon]}>
      <Popup>
        <div className="popup-marker">
          <p>{message}</p>
          <button onClick={() => action(message)}>Choisir</button>
        </div>
      </Popup>
    </Marker>
  );
};

export default FoundMarker;
