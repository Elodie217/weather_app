import { useState, useEffect } from "react";

import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";
import { DateAndTime } from "../components/DateAndTime";
import { MetricsBox } from "../components/MetricsBox";
import { LoadingScreen } from "../components/LoadingScreen";

import styles from "../styles/Home.module.css";
import { getIcone, getWeatherDescription } from "../services/helpers";
import { config } from "../config.json";

export const App = () => {
  const [weatherData2, setWeatherData2] = useState();
  const [unitSystem, setUnitSystem] = useState(config.UNIT_SYSTEM);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${config.LATITUDE_CITY}&longitude=${config.LONGITUDE_CITY}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,visibility&daily=sunrise,sunset&wind_speed_unit=ms&timezone=auto&forecast_days=1`
      );

      const data = await response.json();
      setWeatherData2(data);
    };

    fetchWeatherData();
  }, []);

  return weatherData2 ? (
    <div className={styles.wrapper}>
      <head>
        <meta http-equiv="refresh" content="3600" />
      </head>

      <MainCard
        city={config.NAME_CITY}
        country={config.COUNTRY_CITY}
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
      </ContentBox>
    </div>
  ) : (
    <LoadingScreen loadingMessage="Loading data..." />
  );
};

export default App;
