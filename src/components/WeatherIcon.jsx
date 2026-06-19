export default function WeatherIcon({ condition, isNight = false, size = 32, className = "" }) {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 64 64",
    fill: "none",
    className: `weather-icon ${className}`,
    "aria-hidden": true,
  };

  switch (condition) {
    case "Clear":
      return isNight ? (
        <svg {...props}>
          <circle cx="32" cy="32" r="14" fill="currentColor" opacity="0.95" />
          <circle cx="38" cy="26" r="12" fill="var(--bg-tone, #1a1f4e)" />
        </svg>
      ) : (
        <svg {...props}>
          <circle cx="32" cy="32" r="16" fill="#FFD60A" />
          <g stroke="#FFD60A" strokeWidth="3" strokeLinecap="round">
            <line x1="32" y1="4" x2="32" y2="12" />
            <line x1="32" y1="52" x2="32" y2="60" />
            <line x1="4" y1="32" x2="12" y2="32" />
            <line x1="52" y1="32" x2="60" y2="32" />
            <line x1="12.2" y1="12.2" x2="17.9" y2="17.9" />
            <line x1="46.1" y1="46.1" x2="51.8" y2="51.8" />
            <line x1="12.2" y1="51.8" x2="17.9" y2="46.1" />
            <line x1="46.1" y1="17.9" x2="51.8" y2="12.2" />
          </g>
        </svg>
      );

    case "Clouds":
      return (
        <svg {...props}>
          <ellipse cx="24" cy="36" rx="14" ry="10" fill="rgba(255,255,255,0.5)" />
          <ellipse cx="40" cy="32" rx="18" ry="12" fill="currentColor" opacity="0.9" />
          <ellipse cx="28" cy="30" rx="12" ry="9" fill="currentColor" opacity="0.7" />
        </svg>
      );

    case "Rain":
    case "Drizzle":
      return (
        <svg {...props}>
          <ellipse cx="32" cy="28" rx="20" ry="12" fill="currentColor" opacity="0.85" />
          <ellipse cx="22" cy="26" rx="10" ry="8" fill="currentColor" opacity="0.6" />
          <g stroke="#63B3ED" strokeWidth="2.5" strokeLinecap="round">
            <line x1="22" y1="42" x2="18" y2="52" />
            <line x1="32" y1="42" x2="28" y2="54" />
            <line x1="42" y1="42" x2="38" y2="52" />
          </g>
        </svg>
      );

    case "Thunderstorm":
      return (
        <svg {...props}>
          <ellipse cx="32" cy="26" rx="20" ry="12" fill="currentColor" opacity="0.85" />
          <polygon points="34,36 28,48 32,48 28,58 38,44 34,44" fill="#FFD60A" />
        </svg>
      );

    case "Snow":
      return (
        <svg {...props}>
          <ellipse cx="32" cy="26" rx="18" ry="11" fill="currentColor" opacity="0.8" />
          <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="32" y1="40" x2="32" y2="54" />
            <line x1="25" y1="44" x2="39" y2="50" />
            <line x1="39" y1="44" x2="25" y2="50" />
          </g>
        </svg>
      );

    default:
      return (
        <svg {...props}>
          <ellipse cx="32" cy="30" rx="18" ry="11" fill="currentColor" opacity="0.7" />
          <line x1="16" y1="38" x2="48" y2="38" stroke="currentColor" strokeWidth="2" opacity="0.4" />
          <line x1="20" y1="44" x2="44" y2="44" stroke="currentColor" strokeWidth="2" opacity="0.3" />
        </svg>
      );
  }
}
