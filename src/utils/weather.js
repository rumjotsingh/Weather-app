const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || "956d6fea49abc9877c7cb708c0c35a4a";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function fetchWeather(city) {
  const [currentRes, forecastRes] = await Promise.all([
    fetch(`${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`),
    fetch(`${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`),
  ]);

  if (!currentRes.ok) {
    const err = await currentRes.json().catch(() => ({}));
    throw new Error(err.message || "City not found");
  }

  const current = await currentRes.json();
  const forecast = forecastRes.ok ? await forecastRes.json() : { list: [] };

  return { current, forecast };
}

export async function fetchWeatherByCoords(lat, lon) {
  const [currentRes, forecastRes] = await Promise.all([
    fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`),
    fetch(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`),
  ]);

  if (!currentRes.ok) throw new Error("Unable to fetch location weather");

  const current = await currentRes.json();
  const forecast = forecastRes.ok ? await forecastRes.json() : { list: [] };

  return { current, forecast };
}

export function parseWeatherData({ current, forecast }) {
  const w = current.weather[0];
  const hourly = forecast.list.slice(0, 8).map((item) => ({
    time: item.dt * 1000,
    temp: Math.round(item.main.temp),
    icon: item.weather[0].main,
    description: item.weather[0].description,
  }));

  const dailyMap = new Map();
  forecast.list.forEach((item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "short" });
    if (!dailyMap.has(date)) {
      dailyMap.set(date, {
        date,
        tempMin: item.main.temp_min,
        tempMax: item.main.temp_max,
        icon: item.weather[0].main,
        description: item.weather[0].description,
      });
    } else {
      const existing = dailyMap.get(date);
      existing.tempMin = Math.min(existing.tempMin, item.main.temp_min);
      existing.tempMax = Math.max(existing.tempMax, item.main.temp_max);
    }
  });

  return {
    city: current.name,
    country: current.sys.country,
    temp: Math.round(current.main.temp),
    tempMin: Math.round(current.main.temp_min),
    tempMax: Math.round(current.main.temp_max),
    feelsLike: Math.round(current.main.feels_like),
    humidity: current.main.humidity,
    wind: Math.round(current.wind.speed * 3.6),
    pressure: current.main.pressure,
    visibility: current.visibility ? Math.round(current.visibility / 1000) : null,
    condition: w.main,
    description: w.description,
    icon: w.icon,
    hourly,
    daily: Array.from(dailyMap.values()).slice(0, 7),
  };
}

export function getWeatherTheme(condition, hour = new Date().getHours()) {
  const isNight = hour < 6 || hour >= 20;

  const themes = {
    Clear: isNight
      ? { gradient: "linear-gradient(180deg, #0a0e27 0%, #1a1f4e 40%, #2d3561 100%)", accent: "#ffd60a" }
      : { gradient: "linear-gradient(180deg, #0077be 0%, #4da6ff 50%, #87ceeb 100%)", accent: "#ffd60a" },
    Clouds: isNight
      ? { gradient: "linear-gradient(180deg, #1c1c2e 0%, #2d2d44 50%, #3d3d5c 100%)", accent: "#a0aec0" }
      : { gradient: "linear-gradient(180deg, #5c6b7a 0%, #8b9dc3 50%, #b8c5d6 100%)", accent: "#e2e8f0" },
    Rain: { gradient: "linear-gradient(180deg, #1a2744 0%, #2c4a6e 50%, #4a6fa5 100%)", accent: "#63b3ed" },
    Drizzle: { gradient: "linear-gradient(180deg, #1a2744 0%, #2c4a6e 50%, #4a6fa5 100%)", accent: "#63b3ed" },
    Thunderstorm: { gradient: "linear-gradient(180deg, #0d0d1a 0%, #1a1a3e 50%, #2d2d5e 100%)", accent: "#9f7aea" },
    Snow: { gradient: "linear-gradient(180deg, #a8c8e8 0%, #c8dff0 50%, #e8f0f8 100%)", accent: "#ffffff" },
    Mist: { gradient: "linear-gradient(180deg, #4a5568 0%, #718096 50%, #a0aec0 100%)", accent: "#e2e8f0" },
    Fog: { gradient: "linear-gradient(180deg, #4a5568 0%, #718096 50%, #a0aec0 100%)", accent: "#e2e8f0" },
    Haze: { gradient: "linear-gradient(180deg, #5a6a7a 0%, #8899aa 50%, #b0bec5 100%)", accent: "#ffe082" },
    Smoke: { gradient: "linear-gradient(180deg, #4a5568 0%, #718096 50%, #a0aec0 100%)", accent: "#e2e8f0" },
    Dust: { gradient: "linear-gradient(180deg, #8b7355 0%, #a89070 50%, #c4b090 100%)", accent: "#ffe082" },
  };

  return themes[condition] || themes.Clouds;
}

export function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
  });
}

export function formatDate() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}
