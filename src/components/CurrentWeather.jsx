import { getWeatherEmoji, formatDate } from "../utils/weather";
import "./CurrentWeather.css";

export default function CurrentWeather({ info }) {
  const hour = new Date().getHours();
  const isNight = hour < 6 || hour >= 20;
  const emoji = getWeatherEmoji(info.condition, isNight);

  return (
    <section className="current-weather">
      <p className="current-date">{formatDate()}</p>
      <h1 className="city-name">
        {info.city}
        <span className="country">{info.country}</span>
      </h1>
      <div className="temp-display">
        <span className="weather-emoji">{emoji}</span>
        <span className="temp-value">{info.temp}°</span>
      </div>
      <p className="condition-text">{info.description}</p>
      <p className="high-low">
        H:{info.tempMax}°  L:{info.tempMin}°
      </p>
    </section>
  );
}
