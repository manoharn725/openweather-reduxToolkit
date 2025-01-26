import { useState } from "react";
import { useGetCurrentWeatherQuery } from "./store/api/currentWeatherApi";
import { useConvertToCelsiusContext } from "./context/ConvertToCelsius/useConvertToCelsiusContext";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import WeatherForecastCrad from "./components/WeatherForecastCard";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState();
  const { data, isLoading, isError } = useGetCurrentWeatherQuery(searchTerm);
   const convertToCelsius = useConvertToCelsiusContext();

  const handleSubmit = (term) => {
    setSearchTerm(term);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {isError.message}</p>;
  return (
    <>
      <header className="header">
        <SearchBar onFormSubmit={handleSubmit} />
        <div className="weather-cards">
          <div className="weather-card">
            <span>{data?.name}</span>
            <span>🌤 {convertToCelsius(data?.main?.temp)}°C</span>
          </div>
        </div>
      </header>

  <div className="card__details">
      <WeatherCard data={data} />

      <WeatherForecastCrad lat={data?.coord?.lat} lon={data?.coord?.lon} />
      </div>
    </>
  );
}

export default App;
