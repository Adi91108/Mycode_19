import axios from "axios";
import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import "../App.css";
import MapChart from "../components/MapChart";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import CountrySelect from "../components/CountrySelect";
// import MapChart from "../components/MapChart";
// backend driven

export default function Home() {
  // const [products, setProducts] = useState([]);
  // const [Country, setCountry] = useState("");
  // const position = [51.505, -0.09];
  // const redOptions = { color: "red" };

  const [country, setCountry] = useState("global");
  const [zoom, setZoom] = useState(2);
  const [center, setCenter] = useState([40, 34]);

  async function handleCountryChange(e) {
    setCountry(e.target.value);
    let url;
    if (e.target.value === "global") {
      setCenter([40, 34]);
      setZoom(2);
    } else {
      url = `https://disease.sh/v3/covid-19/countries/${e.target.value}`;
      await fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setCenter([data.countryInfo.lat, data.countryInfo.long]);
          setZoom(6);
        });
    }
  }

  return (
    <>
      {/* <CountrySelect handleCountryChange={handleCountryChange}/> */}
      <MapChart zoom={zoom} center={center} />
    </>
  );
}
