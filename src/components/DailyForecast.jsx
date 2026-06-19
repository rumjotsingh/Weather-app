import WeatherIcon from "./WeatherIcon";
import "./DailyForecast.css";

export default function DailyForecast({ daily }) {
  if (!daily?.length) return null;

  const globalMin = Math.min(...daily.map((d) => d.tempMin));
  const globalMax = Math.max(...daily.map((d) => d.tempMax));
  const range = globalMax - globalMin || 1;

  return (
    <section className="glass-card daily-forecast">
      <h2 className="card-title">7-day forecast</h2>
      <div className="daily-list">
        {daily.map((day, i) => {
          const lowPct = ((day.tempMin - globalMin) / range) * 100;
          const highPct = ((day.tempMax - globalMin) / range) * 100;

          return (
            <div className="daily-item" key={i}>
              <span className="daily-date">{i === 0 ? "Today" : day.date}</span>
              <WeatherIcon condition={day.icon} size={26} className="daily-weather-icon" />
              <div className="daily-temps">
                <span className="daily-low">{Math.round(day.tempMin)}°</span>
                <div className="temp-bar">
                  <div
                    className="temp-bar-fill"
                    style={{ left: `${lowPct}%`, width: `${Math.max(highPct - lowPct, 8)}%` }}
                  />
                </div>
                <span className="daily-high">{Math.round(day.tempMax)}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
