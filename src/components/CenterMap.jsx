import React from 'react'
import { useMap } from 'react-leaflet';

// Le hook map doit être appelé comme enfant du composant MapContainer
const CenterMap = ({position}) => {
  const map = useMap();
  map.setView(position);
  return null;
}

export default CenterMap