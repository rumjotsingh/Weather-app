import { getWeatherEmoji, formatTime } from "../utils/weather";
import "./HourlyForecast.css";

export default function HourlyForecast({ hourly }) {
  if (!hourly?.length) return null;

  const hour = new Date().getHours();
  const isNight = hour < 6 || hour >= 20;

  return (
    <section className="glass-card hourly-forecast">
      <h2 className="card-title">HOURLY FORECAST</h2>
      <div className="hourly-scroll">
        {hourly.map((item, i) => (
          <div className="hourly-item" key={i}>
            <span className="hourly-time">{i === 0 ? "Now" : formatTime(item.time)}</span>
            <span className="hourly-icon">{getWeatherEmoji(item.icon, isNight)}</span>
            <span className="hourly-temp">{item.temp}°</span>
          </div>
        ))}
      </div>
    </section>
  );
}
