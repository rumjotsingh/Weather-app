import WeatherIcon from "./WeatherIcon";
import { formatDate } from "../utils/weather";
import "./CurrentWeather.css";

export default function CurrentWeather({ info }) {
  const hour = new Date().getHours();
  const isNight = hour < 6 || hour >= 20;

  return (
    <section className="current-weather">
      <p className="current-date">{formatDate()}</p>
      <h1 className="city-name">{info.city}</h1>
      <div className="hero-icon">
        <WeatherIcon condition={info.condition} isNight={isNight} size={56} />
      </div>
      <div className="temp-value">{info.temp}°</div>
      <p className="condition-text">{info.description}</p>
      <p className="high-low">
        H:{info.tempMax}° · L:{info.tempMin}°
      </p>
    </section>
  );
}
