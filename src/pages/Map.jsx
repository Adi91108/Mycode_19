// // import React from 'react'
// import axios from "axios";
// import { useEffect, useState } from "react";
// import {
//   CircleMarker,
//   MapContainer,
//   Marker,
//   Popup,
//   TileLayer,
//   useMap,
// } from "react-leaflet";

// const Map = () => {
//   const position = [51.505, -0.09];
//   const [totalResByCountry, setTotalResByCountry] = useState([]);
//   const [countries, setCountries] = useState([]);
//   const [province, setProvince] = useState([]);
//   const [selectprovince, setSelectProvince] = useState("");
//   const [selcountries, setSelCountries] = useState("IND");
//   const redOptions = { color: "red" };
//   //   const [date, setDate] = useState(() => {
//   //     const today = new Date();
//   //     const formattedDate = today.toISOString().split('T')[0];
//   //     return formattedDate;
//   //   });
//   const [date, setDate] = useState("2022-02-23");

//   const handleDateChange = (event) => {
//     setDate(event.target.value);
//     console.log(date);
//   };
//   const fetchData1 = async () => {
//     const res = await axios.get(`https://covid-api.com/api/regions`);
//     // console.log(res.data.data);
//     setCountries(res.data.data);
//   };
//   const fetchData2 = async () => {
//     const res = await axios.get(
//       `https://covid-api.com/api/provinces/${selcountries}`
//     );
//     // console.log(res.data.data);
//     setProvince(res.data.data);
//   };

//   const fetchData = async () => {
//     const res =
//       await axios.get(`https://covid-api.com/api/reports/total?date=${date}&iso=${selcountries}
// `);
//     // console.log(res.data.data);
//     setTotalResByCountry(res.data.data);
//   };
//   //   const fetchData3 = async () => {
//   //     const res =
//   //       await axios.get(`https://covid-api.com/api/reports?date=${date}&iso=${selcountries}&region_province=${selectprovince}

//   // `);
//   //     console.log(res.data.data);
//   //     setSelectProvince(res.data.data);
//   //   };
//   const fetchData3 = async () => {
//     try {
//       const res = await axios.get(
//         `https://covid-api.com/api/reports?date=${date}&iso=${selcountries}&region_province=${selectprovince}`
//       );

//       if (res.data && res.data.data) {
//         console.log(res.data.data);
//         setSelectProvince(res.data.data);
//       } else {
//         console.error("Response data is null or undefined");
//         // Handle the case where data is null or undefined
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       // Handle any errors that occur during the API call
//     }
//   };
//   useEffect(() => {
//     fetchData3();
//   }, [selectprovince, selcountries, date]);

//   useEffect(() => {
//     fetchData();
//     fetchData1();
//     fetchData2();
//   }, [date, selcountries, selectprovince]);
//   // console.log(selectprovince);
//   return (
//     <>
//       <div>Map</div>
//       <div>
//         <input type="date" value={date} onChange={handleDateChange} />
//       </div>
//       {countries.length > 0 && (
//         <div className="products">
//           <select
//             value={selcountries}
//             onChange={(e) => setSelCountries(e.target.value)}
//           >
//             {countries.map(
//               (country) => (
//                 <option key={country.name} value={country.iso}>
//                   {country.name}
//                 </option>
//               )
//               // <option value="otherOption">Other option</option>
//             )}
//           </select>
//           <p>{selcountries} is country</p>
//         </div>
//       )}
//       {province.length > 0 && (
//         <div className="products">
//           <select
//             value={selectprovince !== null ? "Assam" : selectprovince}
//             // defaultValue={"Assam"}
//             onChange={(e) => setSelectProvince(e.target.value)}
//           >
//             {province
//               .filter((prov) => prov.province !== null)
//               .map((prov, i) => (
//                 // console.log(prov, i)
//                 <option key={prov.province} value={prov.province}>
//                   {prov.province}
//                 </option>
//               ))}
//           </select>
//         </div>
//       )}

//       <div className="map">
//         <MapContainer center={position} zoom={3} scrollWheelZoom={false}>
//           {province
//             .filter((pro) => pro.lat !== null && pro.long !== null)
//             .map((pro) => {
//               let center = [pro.lat, pro.long];
//               return (
//                 <CircleMarker
//                   key={pro.province}
//                   center={center}
//                   pathOptions={redOptions}
//                   radius={2}
//                 >
//                   <Popup>Popup in CircleMarker</Popup>
//                 </CircleMarker>
//               );
//             })}

//           <TileLayer
//             attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />
//         </MapContainer>
//       </div>

//       <div>
//         <h4>confirmed : {totalResByCountry.confirmed}</h4>
//         <h4>confirmed_diff: {totalResByCountry.confirmed_diff}</h4>
//         <h4>deaths: {totalResByCountry.deaths}</h4>
//         <h4>deaths_diff: {totalResByCountry.deaths_diff}</h4>
//         <h4>recovered: {totalResByCountry.recovered}</h4>
//         <h4>recovered_diff: {totalResByCountry.recovered_diff}</h4>
//         <h4>active: {totalResByCountry.active}</h4>
//         <h4>active_diff: {totalResByCountry.active_diff}</h4>
//         <h4>fatality_rate: {totalResByCountry.fatality_rate}</h4>
//       </div>
//     </>
//   );
// };

// export default Map;

/////////// new

import { useEffect, useState } from "react";
import axios from "axios";
import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import {
  Box,
  Breadcrumbs,
  Card,
  CardContent,
  Link,
  Typography,
} from "@mui/material";
// import "../node_modules/leaflet/dist/leaflet.css";
import "../../node_modules/leaflet/dist/leaflet.css";
const Map = () => {
  const [location, setLocation] = useState([20.5937, 78.9629]);
  const [totalResByCountry, setTotalResByCountry] = useState({});
  const [countries, setCountries] = useState([]);
  const [province, setProvince] = useState([]);
  const [selectprovince, setSelectProvince] = useState([]);
  const [selcountries, setSelCountries] = useState("IND");
  const redOptions = { color: "red" };
  const [date, setDate] = useState("2022-02-23");

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const fetchData = async () => {
    try {
      const [regionsRes, provincesRes, totalRes] = await Promise.all([
        axios.get(`https://covid-api.com/api/regions`),
        axios.get(`https://covid-api.com/api/provinces/${selcountries}`),
        axios.get(
          `https://covid-api.com/api/reports/total?date=${date}&iso=${selcountries}`
        ),
      ]);

      setCountries(regionsRes.data.data);
      setProvince(provincesRes.data.data);
      if (provincesRes.data.data.length > 0) {
        setLocation([
          provincesRes.data.data[0].lat,
          provincesRes.data.data[0].long,
        ]);
      }
      // console.log(provincesRes.data.data[0].lat);
      // console.log(provincesRes.data.data[0].long);
      // setLocation(...location, [
      //   provincesRes.data.data[0].lat,
      //   provincesRes.data.data[0].long,
      // ]);
      setTotalResByCountry(totalRes.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData3 = async () => {
    try {
      const res = await axios.get(
        `https://covid-api.com/api/reports?date=${date}&iso=${selcountries}`
      );

      if (res.data && res.data.data) {
        console.log(res.data.data);
        setSelectProvince(res.data.data);
      } else {
        console.error("Response data is null or undefined");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selcountries, date]);

  useEffect(() => {
    fetchData3();
  }, [selcountries, date]);

  // const filteredProvinces = useMemo(
  //   () => province.filter((prov) => prov.province !== null),
  //   [province]
  // );

  // const markers = useMemo(
  //   () =>
  //     filteredProvinces.filter((pro) => pro.lat !== null && pro.long !== null),
  //   [filteredProvinces]
  // );

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Typography color="text.primary"> States</Typography>
      </Breadcrumbs>
      <div className="text-3xl font-bold underline text-red-800	">Map</div>
      <div>
        <input type="date" value={date} onChange={handleDateChange} />
      </div>
      {countries.length > 0 && (
        <div className="products">
          <select
            value={selcountries}
            onChange={(e) => setSelCountries(e.target.value)}
          >
            {countries.map((country) => (
              <option key={country.name} value={country.iso}>
                {country.name}
              </option>
            ))}
          </select>
          <p>{selcountries} is country</p>
        </div>
      )}
      {/* {filteredProvinces.length > 0 && (
        <div className="products">
          <select
            value={selectprovince}
            onChange={(e) => setSelectProvince(e.target.value)}
          >
            {filteredProvinces.map((prov) => (
              <option key={prov.province} value={prov.province}>
                {prov.province}
              </option>
            ))}
          </select>
        </div>
      )} */}



      <div className="Map__main">
        <MapContainer center={location} zoom={3} scrollWheelZoom={true}>
          {/* {markers.map((pro) => {
            let center = [pro.lat, pro.long];
            return (
              <CircleMarker
                key={pro.province}
                center={center}
                pathOptions={redOptions}
                radius={2}
              >
                <Popup>{pro.province}</Popup>
              </CircleMarker>
            );
          })} */}

          {selectprovince
            .filter(
              (pro) => pro.region.lat !== null && pro.region.long !== null
            )
            .map((pro) => {
              let center = [pro.region.lat, pro.region.long];
              // console.log(pro)
              return (
                <CircleMarker
                  key={pro.region.lat}
                  center={center}
                  pathOptions={redOptions}
                  radius={8}
                >
                  <Popup>
                    {
                      <Box sx={{ minWidth: 275 }}>
                        <Card variant="outlined">
                          {" "}
                          <CardContent>
                            <Typography
                              sx={{ fontSize: 14 }}
                              color="text.secondary"
                              gutterBottom
                            >
                              Total Cases : {pro.region.province}
                            </Typography>
                            <Typography
                              sx={{ fontSize: 14 }}
                              color="text.secondary"
                              gutterBottom
                            >
                              Total Cases : {pro.confirmed}
                            </Typography>
                            <Typography
                              sx={{ fontSize: 14 }}
                              color="text.secondary"
                              gutterBottom
                            >
                              Active Cases : {pro.active}
                            </Typography>
                            <Typography
                              sx={{ fontSize: 14 }}
                              color="text.secondary"
                              gutterBottom
                            >
                              Patients Recovered : {pro.recovered}
                            </Typography>
                            <Typography
                              sx={{ fontSize: 14 }}
                              color="text.secondary"
                              gutterBottom
                            >
                              Fatality Rate : {pro.fatality_rate}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Box>
                    }
                  </Popup>
                </CircleMarker>
              );
            })}

          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>

      <div>
        <h4>confirmed : {totalResByCountry.confirmed}</h4>
        <h4>confirmed_diff: {totalResByCountry.confirmed_diff}</h4>
        <h4>deaths: {totalResByCountry.deaths}</h4>
        <h4>deaths_diff: {totalResByCountry.deaths_diff}</h4>
        <h4>recovered: {totalResByCountry.recovered}</h4>
        <h4>recovered_diff: {totalResByCountry.recovered_diff}</h4>
        <h4>active: {totalResByCountry.active}</h4>
        <h4>active_diff: {totalResByCountry.active_diff}</h4>
        <h4>fatality_rate: {totalResByCountry.fatality_rate}</h4>
      </div>
    </>
  );
};

export default Map;
