import React, { useState } from "react";
import loupe from "../assets/loupe.png";
import loader from "../assets/loader.gif";

const SearchBar = ({ action }) => {
  const [searchText, setSearchText] = useState([]);
  const [search, setSearch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  // On cherche les villes correspondant à la valeur de address
  const onSearch = async (address) => {
    if (address.trim().length !== 0) {
      const json = await fetch(
        `${
          import.meta.env.VITE_NOMINATIM_API_URL
        }search?format=json&city=${address}`
      ).then((response) => response.json());

      if (Array.isArray(json)) {
        setSearch(json);
      } else {
        setSearch([]);
      }
    }
    setLoading(false);
  };

  // On crée un bouton pour chaque suggestion d'addresse
  const searchList = search.map((city) => {
    return (
      <button
        className="search-item-button"
        key={city.place_id}
        onClick={() => {
          action(city);
          setSearchText(city.name);
          setSearch([]);
        }}
      >
        {city.display_name}
      </button>
    );
  });

  // On récupère la position de l'utilisateur
  const getUserLocation = async () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          setUserLocation(null);
          console.error("Error getting user location:", error);
        }
      );
      if (userLocation != null) {
        const json = await fetch(
          `${import.meta.env.VITE_NOMINATIM_API_URL}reverse?format=json&lat=${
            userLocation.latitude
          }&lon=${userLocation.longitude}`
        ).then((response) => response.json());

        const city = {
          name: json.address.city,
          lat: userLocation.latitude,
          lon: userLocation.longitude,
        };
        action(city);
      }
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    setLoading(false);
  };

  return (
    <div className="searchBar">
      <p>Rechercher un restaurant</p>
      <input
        type="text"
        name="search"
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
      />
      <button
        className="searchButton"
        onClick={() => {
          setLoading(true);
          onSearch(searchText);
        }}
      >
        <img className="loupe" src={loupe} alt="Recherche" />
      </button>
      <button className="myLocation" onClick={getUserLocation}>
        My Location
      </button>
      {loading ? (
        <div>
          <img className="loader" src={loader} alt="Chargement" />
        </div>
      ) : null}
      <div className="searchList">{searchList}</div>
    </div>
  );
};

export default SearchBar;
