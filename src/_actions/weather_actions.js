import axios from "axios";
import {
  FETCH_WEATHER_DATA,
  FETCH_WEATHER_SELECTED_CITY,
  FETCH_WEATHER_SELECTED_CITY_FORECAST,
} from "./types";
// import { USER_SERVER } from "../components/Config.js";
const api_key = "d4e3aa36429c43bbcbd331dc5d1d8f7a";

// export function getCitiesAndForecast(payload) {
//   const getCities = "cities-fr.json";
//   const getForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${payload.nm}&appid=${api_key}`;

//   const request = axios.get("cities-fr.json").then((response) => response.data);

//   return {
//     type: FETCH_WEATHER_DATA,
//     payload: request,
//   };
// }

export function getCities() {
  const request = axios.get("cities-fr.json").then((response) => response.data);

  return {
    type: FETCH_WEATHER_DATA,
    payload: request,
  };
}

export function getSelectedCityForecast(opt) {
  const request = axios
    .get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${opt.label}&appid=${api_key}`
    )
    .then((response) => response.data);

  return {
    type: FETCH_WEATHER_SELECTED_CITY_FORECAST,
    payload: request,
  };
}
export function getWeatherDetails(opt) {
  const request = axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${opt.label}&appid=${api_key}`
    )
    .then((response) => response.data);

  return {
    type: FETCH_WEATHER_SELECTED_CITY,
    payload: request,
  };
}
