import { useState } from "react";
import "./SearchBar.css";

export default function SearchBar({ onSearch, onLocate, loading }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setCity("");
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Search for a city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={loading}
            aria-label="City name"
          />
        </div>
      </form>
      <button
        className="locate-btn"
        onClick={onLocate}
        disabled={loading}
        aria-label="Use my location"
        title="Use my location"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M12 21s6-5.33 6-10a6 6 0 1 0-12 0c0 4.67 6 10 6 10z" />
          <circle cx="12" cy="11" r="2" />
        </svg>
      </button>
    </div>
  );
}
