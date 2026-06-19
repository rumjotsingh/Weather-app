import DetailIcon from "./DetailIcon";
import "./WeatherDetails.css";

export default function WeatherDetails({ info }) {
  const rows = [
    { type: "feelsLike", label: "Feels Like", value: `${info.feelsLike}°` },
    { type: "humidity", label: "Humidity", value: `${info.humidity}%` },
    { type: "wind", label: "Wind", value: `${info.wind} km/h` },
    { type: "pressure", label: "Pressure", value: `${info.pressure} hPa` },
  ];

  if (info.visibility) {
    rows.push({ type: "visibility", label: "Visibility", value: `${info.visibility} km` });
  }

  return (
    <section className="glass-card weather-details">
      <h2 className="card-title">Details</h2>
      <div className="details-list">
        {rows.map((row) => (
          <div className="detail-row" key={row.label}>
            <DetailIcon type={row.type} />
            <span className="detail-label">{row.label}</span>
            <span className="detail-value">{row.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
