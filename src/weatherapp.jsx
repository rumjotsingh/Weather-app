import { useState, useEffect, useCallback } from "react";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import DailyForecast from "./components/DailyForecast";
import WeatherDetails from "./components/WeatherDetails";
import {
  fetchWeather,
  fetchWeatherByCoords,
  parseWeatherData,
  getWeatherTheme,
} from "./utils/weather";
import "./WeatherApp.css";

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadWeather = useCallback(async (fetcher) => {
    setLoading(true);
    setError(null);
    try {
      const raw = await fetcher();
      setWeather(parseWeatherData(raw));
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWeather(() => fetchWeather("Delhi"));
  }, [loadWeather]);

  const handleSearch = (city) => {
    loadWeather(() => fetchWeather(city));
  };

  const handleLocate = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        loadWeather(() =>
          fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude)
        );
      },
      () => setError("Unable to retrieve your location")
    );
  };

  const theme = weather
    ? getWeatherTheme(weather.condition)
    : getWeatherTheme("Clear");

  return (
    <div className="weather-app" style={{ background: theme.gradient }}>
      <div className="weather-content">
        <SearchBar onSearch={handleSearch} onLocate={handleLocate} loading={loading} />

        {error && (
          <div className="error-banner" role="alert">
            <span>{error}</span>
            <button onClick={() => setError(null)} aria-label="Dismiss">✕</button>
          </div>
        )}

        {loading && !weather && (
          <div className="loading-state">
            <div className="spinner" />
            <p>Loading weather…</p>
          </div>
        )}

        {weather && (
          <div className={`weather-body ${loading ? "loading" : ""}`}>
            <CurrentWeather info={weather} />
            <HourlyForecast hourly={weather.hourly} />
            <WeatherDetails info={weather} />
            <DailyForecast daily={weather.daily} />
          </div>
        )}
      </div>
    </div>
  );
}
