import { useState, useEffect } from "react";
import {
  getCurrentWeather,
  getCurrentWeatherByCoords,
  getWeatherForecast,
  getWeatherForecastByCoords,
} from "../services/WeatherAPI";

export const useWeather = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForeCast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnits] = useState("C");

  const fetchWeatherByCity = async (city) => {
  
    setLoading(true);
    setError(null);

    try {
      let weatherData;
      let forecastData;

      if (typeof city === "string") {
        weatherData = await getCurrentWeather(city);
        forecastData = await getWeatherForecast(city);
      } else {
        weatherData = await getCurrentWeatherByCoords(city.lat, city.lon);
        forecastData = await getWeatherForecastByCoords(city.lat, city.lon);
      }

      setCurrentWeather(weatherData);
      setForeCast(forecastData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch weather data",
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByLocation = async () => {
    if (!navigator.geolocation) {
      setError("GeoLocation is not supported by this browser");
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const weatherData = await getCurrentWeatherByCoords(
            latitude,
            longitude,
          );

          setCurrentWeather(weatherData);

          // also fetch forecast for the current location
          const forecastData = await getWeatherForecastByCoords(
            latitude,
            longitude,
          );
          setForeCast(forecastData);
        } catch (err) {
          setError(
            err instanceof Error ? err.message : "Failed to fetch weather data",
          );
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        setError("Unable to obtain your location");
        setLoading(false);
      },
    );
  };

  const toggleUnit = () => {
    setUnits((prevUnit) => (prevUnit === "C" ? "F" : "C"));
  };

  // LOAD DEFAULT ON OTHER MOUNT

  useEffect(() => {
    fetchWeatherByCity("Islamabad");
  }, []);

  return {
    currentWeather,
    forecast,
    loading,
    error,
    unit,
    fetchWeatherByCity,
    fetchWeatherByLocation,
    toggleUnit,
  };
};
