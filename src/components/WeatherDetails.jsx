import "./WeatherDetails.css";

const DETAIL_ICONS = {
  "Feels Like": "🌡️",
  Humidity: "💧",
  Wind: "💨",
  Pressure: "⏲️",
  Visibility: "👁️",
};

export default function WeatherDetails({ info }) {
  const details = [
    { label: "Feels Like", value: `${info.feelsLike}°` },
    { label: "Humidity", value: `${info.humidity}%` },
    { label: "Wind", value: `${info.wind} km/h` },
    { label: "Pressure", value: `${info.pressure} hPa` },
  ];

  if (info.visibility) {
    details.push({ label: "Visibility", value: `${info.visibility} km` });
  }

  return (
    <section className="weather-details">
      {details.map((d) => (
        <div className="glass-card detail-card" key={d.label}>
          <span className="detail-icon">{DETAIL_ICONS[d.label]}</span>
          <span className="detail-label">{d.label}</span>
          <span className="detail-value">{d.value}</span>
        </div>
      ))}
    </section>
  );
}
