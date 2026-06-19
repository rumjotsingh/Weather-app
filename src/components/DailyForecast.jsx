import { getWeatherEmoji } from "../utils/weather";
import "./DailyForecast.css";

export default function DailyForecast({ daily }) {
  if (!daily?.length) return null;

  return (
    <section className="glass-card daily-forecast">
      <h2 className="card-title">7-DAY FORECAST</h2>
      <div className="daily-list">
        {daily.map((day, i) => (
          <div className="daily-item" key={i}>
            <span className="daily-date">{i === 0 ? "Today" : day.date}</span>
            <span className="daily-icon">{getWeatherEmoji(day.icon)}</span>
            <div className="daily-temps">
              <span className="daily-low">{Math.round(day.tempMin)}°</span>
              <div className="temp-bar">
                <div
                  className="temp-bar-fill"
                  style={{
                    width: `${Math.min(100, ((day.tempMax - day.tempMin) / 20) * 100 + 30)}%`,
                  }}
                />
              </div>
              <span className="daily-high">{Math.round(day.tempMax)}°</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
