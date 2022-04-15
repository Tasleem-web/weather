import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCities,
  getWeatherDetails,
  getSelectedCityForecast,
} from "../../../_actions/weather_actions";
import "./weather.css";
import Select from "react-select";
import Loader from "../loader/loader";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Weather = () => {
  // const weather = useSelector((state) => state.weather);
  // console.log(weather);
  const dispatch = useDispatch();
  const [cities, setCities] = useState(null);
  const [maxValue, setMaxValue] = useState(null);
  const [minValue, setMinValue] = useState(null);
  const [images, setImages] = useState(null);
  const [weekDay, setWeekDay] = useState([
    "Tuesday",
    "Wednesday",
    "Thursday"
  ]);
  const [fiveDays, setFiveDays] = useState(null);
  const [checkDayVar, setCheckDayVar] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCityVal, setSelectedCityVal] = useState("");
  const [selectedCityImage, setSelectedCityImage] = useState("");
  const [loader, setLoader] = useState(null);

  useEffect(() => {
    // setWeekDay();
    dispatch(getCities())
      .then((res) => {
        let mapCities = res.payload.map((opt) => ({
          id: opt.id,
          label: opt.nm,
          lat: opt.lat,
          lon: opt.lon,
          value: opt.id,
        }));
        setCities(mapCities);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getSelectedCity = (opt) => {
    setSelectedCity(opt.label);
    dispatch(getSelectedCityForecast(opt))
      .then((res) => {
        const days = res?.payload?.list?.slice(0, 3);
        console.log(days);
        setFiveDays(days);
        let maxValue = [];
        let minValue = [];
        let images = [];
        let checkDayVar = [];
        for (let i = 0; i < days.length; i++) {
          maxValue.push(
            Math.round(Number(days[i].main.temp_max - 273.15)) + "°"
          );
          minValue.push(
            Math.round(Number(days[i].main.temp_min - 273.15)) + "°"
          );
          images.push(
            `http://openweathermap.org/img/wn//${days[i].weather[0].icon}.png`
          );
          checkDayVar.push(checkDay(i));
        }
        setMaxValue(maxValue);
        setMinValue(minValue);
        setImages(images);
        setCheckDayVar(checkDayVar);
      })
      .catch((err) => {
        console.log("Something Went Wrong");
      });
    setLoader(true);
    getWeatherDetailsCall(opt);
  };

  const getWeatherDetailsCall = (opt) => {
    dispatch(getWeatherDetails(opt))
      .then((res) => {
        setLoader(false);
        setSelectedCityVal(
          Math.round(Number(res.payload.main.temp_max - 273.15)) + "°"
        );
        setSelectedCityImage(
          "http://openweathermap.org/img/wn/" +
            res.payload.weather[0].icon +
            ".png"
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkDay = (day) => {
      return <div>{weekDay[day]}</div>;
  };

  return (
    <div className="weather-container">
      <div className="weather-inner-container">
        <div className="wrapper">
          <div className="form-wrapper">
            <form noValidate>
              <label htmlFor="city">Select Your city</label>
              <Select
                options={cities}
                id="city"
                onChange={(opt) => getSelectedCity(opt)}
              />
            </form>
            {!loader ? (
              <div className="city-name">
                {selectedCity && (
                  <div className="selected-city">{selectedCity}</div>
                )}
                <div className="selected-val">
                  <div>
                    <img src={selectedCityImage} alt="" />
                  </div>
                  <div>{selectedCityVal}</div>
                </div>
                {checkDayVar?.length > 0 && (
                  <div className="weather-in-diff-city">
                    {checkDayVar.map((day, i) => (
                      <div key={i}>{day}</div>
                    ))}
                  </div>
                )}
                <div className="weather-image-view">
                  {images?.length > 0 &&
                    images.map((image, i) => (
                      <div key={i}>
                        <img src={image} alt="" />
                      </div>
                    ))}
                </div>
                <div className="max-weather">
                  {maxValue?.length > 0 &&
                    maxValue.map((max, i) => <div key={i}>{max}</div>)}
                </div>
                <div className="min-weather">
                  {minValue?.length > 0 &&
                    minValue.map((min, i) => <div key={i}>{min}</div>)}
                </div>
              </div>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
