import {
  unixToLocalTime,
  kmToMiles,
  mpsToMph,
  timeTo12HourFormat,
  timeFormat,
} from "./converters";

export const getWindSpeed = (unitSystem, windInMps) =>
  unitSystem == "metric" ? windInMps : mpsToMph(windInMps);

export const getVisibility = (unitSystem, visibilityInMeters) =>
  unitSystem == "metric"
    ? (visibilityInMeters / 1000).toFixed(1)
    : kmToMiles(visibilityInMeters / 1000);

export const getTime = (unitSystem, dateTime) =>
  unitSystem == "metric"
    ? timeFormat(dateTime)
    : timeTo12HourFormat(timeFormat(dateTime));

export const getAMPM = (unitSystem, dateTime) =>
  unitSystem === "imperial"
    ? timeFormat(dateTime).split(":")[0] >= 12
      ? "PM"
      : "AM"
    : "";

export const getWeekDay = (weekDay) => {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = new Date(weekDay);
  return weekday[day.getDay()];
};

export const getWeatherDescription = (weatherCode) => {
  const weatherDescription = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snow fall",
    73: "Moderate snow fall",
    75: "Heavy snow fall",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Slight or moderate thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
  };

  return weatherDescription[weatherCode];
};

export const getIcone = (weatherCode, isDay) => {
  let numberIcone = "";
  if (weatherCode == 0) {
    numberIcone = "01";
  } else if (weatherCode == 1) {
    numberIcone = "02";
  } else if (weatherCode == 2) {
    numberIcone = "03";
  } else if (weatherCode == 3) {
    numberIcone = "04";
  } else if (
    weatherCode == 61 ||
    weatherCode == 63 ||
    weatherCode == 65 ||
    weatherCode == 66 ||
    weatherCode == 67 ||
    weatherCode == 80 ||
    weatherCode == 81 ||
    weatherCode == 82 ||
    weatherCode == 51 ||
    weatherCode == 53 ||
    weatherCode == 55 ||
    weatherCode == 56 ||
    weatherCode == 57
  ) {
    numberIcone = "10";
  } else if (weatherCode == 95 || weatherCode == 96 || weatherCode == 99) {
    numberIcone = "11";
  } else if (
    weatherCode == 71 ||
    weatherCode == 73 ||
    weatherCode == 75 ||
    weatherCode == 77 ||
    weatherCode == 85 ||
    weatherCode == 86
  ) {
    numberIcone = "13";
  } else if (weatherCode == 45 || weatherCode == 48) {
    numberIcone = "50";
  }

  let day = "";
  if (isDay == 1) {
    day = "d";
  } else {
    day = "n";
  }

  return numberIcone + day;
};
