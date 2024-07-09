import { useState, useEffect } from "react";

import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";
import { DateAndTime } from "../components/DateAndTime";
import { MetricsBox } from "../components/MetricsBox";
import { UnitSwitch } from "../components/UnitSwitch";
import { LoadingScreen } from "../components/LoadingScreen";

import styles from "../styles/Home.module.css";
import {
  COUNTRY_CITY,
  LATITUDE_CITY,
  LONGITUDE_CITY,
  NAME_CITY,
} from "../services/config";
import { getIcone, getWeatherDescription } from "../services/helpers";
import { timeFormat } from "../services/converters";

export const App = () => {
  const [cityInput, setCityInput] = useState("Riga");
  const [triggerFetch, setTriggerFetch] = useState(true);
  const [weatherData, setWeatherData] = useState();
  const [weatherData2, setWeatherData2] = useState();
  const [unitSystem, setUnitSystem] = useState("metric");

  const changeSystem = () =>
    unitSystem == "metric"
      ? setUnitSystem("imperial")
      : setUnitSystem("metric");

  useEffect(() => {
    const fetchWeatherData = async () => {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE_CITY}&longitude=${LONGITUDE_CITY}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,visibility&daily=sunrise,sunset&wind_speed_unit=ms&timezone=auto&forecast_days=1`
      );

      const data = await response.json();
      setWeatherData2(data);
      console.log(data);
      console.log(timeFormat(data.daily.sunset));
    };

    fetchWeatherData();
  }, []);

  // if (!weatherData) {
  //   return <div>Loading...</div>;
  // }

  return weatherData2 ? (
    <div className={styles.wrapper}>
      <head>
        <meta http-equiv="refresh" content="3600" />
      </head>

      <MainCard
        city={NAME_CITY}
        country={COUNTRY_CITY}
        description={getWeatherDescription(weatherData2.current.weather_code)}
        iconName={getIcone(
          weatherData2.current.weather_code,
          weatherData2.current.is_day
        )}
        unitSystem={unitSystem}
        weatherData={weatherData2}
      />
      <ContentBox>
        <Header>
          <DateAndTime weatherData={weatherData2} unitSystem={unitSystem} />
        </Header>
        <MetricsBox weatherData={weatherData2} unitSystem={unitSystem} />
        <UnitSwitch onClick={changeSystem} unitSystem={unitSystem} />
      </ContentBox>
    </div>
  ) : (
    <LoadingScreen loadingMessage="Loading data..." />
  );
};

export default App;

// import { useState, useEffect } from "react";

// const WeatherComponent = () => {
//   const [weatherData, setWeatherData] = useState(null);

//   useEffect(() => {
//     const fetchWeatherData = async () => {
//       const latitude = 48.8566;
//       const longitude = 2.3522;
//       const response = await fetch(
//         `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m&daily=sunrise,sunset&timezone=auto`
//       );
//       const data = await response.json();
//       setWeatherData(data);
//       console.log(data);
//     };

//     fetchWeatherData();
//   }, []);

//   if (!weatherData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>Weather Data</h1>
//       <ul>
//         {weatherData.hourly.time.map((time, index) => (
//           <li key={time}>
//             {time}: {weatherData.hourly.temperature_2m[index]}°C
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default WeatherComponent;
