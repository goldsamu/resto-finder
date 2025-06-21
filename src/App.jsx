import React, { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "./App.css";
import "leaflet/dist/leaflet.css";
import SearchBar from "./components/SearchBar";
import SelectedSearch from "./components/SelectedSearch";
import CenterMap from "./components/CenterMap";
import FoundMarker from "./components/FoundMarker";

// Qu'une seule page pour cette application, donc pas de router.
const App = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [position, setPosition] = useState({ lat: 48.8589385, lon: 2.2646332 }); // Position par défaut Paris
  const [chosenRestaurant, setChosenRestaurant] = useState({
    isChosen: false,
    address: "",
  });

  const handleSearchRestaurant = async ({ name, lat, lon }) => {
    const json = await fetch(
      `${import.meta.env.VITE_NOMINATIM_API_URL}search?q=restaurant%20in%20${name}&format=json`
    ).then((response) => response.json());

    setPosition({ lat, lon });
    setRestaurants(json);
    setChosenRestaurant({
      isChosen: false,
      address: "",
    });
  };

  const handleChoseRestaurant = (address) => {
    setChosenRestaurant({
      isChosen: true,
      address: address,
    });
  };

  // On place tous les marqueurs sur la carte
  const markersRestaurants = restaurants.map((restaurant) => {
    return (
      <FoundMarker
        key={restaurant.place_id}
        lat={restaurant.lat}
        lon={restaurant.lon}
        message={restaurant.display_name}
        action={(e) => handleChoseRestaurant(e)}
      />
    );
  });

  return (
    <div className="map">
      <SearchBar action={(city) => handleSearchRestaurant(city)} />
      <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markersRestaurants}
        <CenterMap position={position} />
      </MapContainer>
      <SelectedSearch
        isAddressChosen={chosenRestaurant.isChosen}
        message={chosenRestaurant.address}
      />
    </div>
  );
};

export default App;
