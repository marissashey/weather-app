import { useState } from "react";
import { Model } from "./Model";

const API_KEY = "da00e72cf76c106587ce0bc2fc50745b";
export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchWeather() {
    if (!city) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&units=imperial&appid=${API_KEY}`
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div class='justify-items-center'>
        <div class='flex-1'>
          <input
            type='text'
            placeholder='Set your current location'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={fetchWeather} disabled={loading}>
            {loading ? "Loading..." : "Get Weather"}
          </button>
        </div>

        <div>{error && <p>{error}</p>}</div>

        {weather && (
          <div>
            {/* {weather.name} */}
            {/* {weather.sys.country} */}
            <div>{weather.weather[0].description}</div>
            {/* <div>{weather.weather[0].icon}</div> */}
            temp:<div>{Math.round(weather.main.temp)}°F</div>
            feels like:<div>{Math.round(weather.main.feels_like)}°F</div>
            min:<div>{Math.round(weather.main.temp_min)}°F</div>
            max:<div>{Math.round(weather.main.temp_max)}°F</div>
            {/* humidity:<div>{Math.round(weather.main.humidity)}</div> */}
            {/* sunrise:<div>{weather.sys.sunrise}</div>
            sunset:<div>{weather.sys.sunset}</div> */}
          </div>
        )}

        <Model />
      </div>
    </>
  );
}
