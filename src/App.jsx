import { useState } from "react";
import { useGetCurrentWeatherQuery } from "./store/api/currentWeatherApi";
import SearchBar from "./components/SearchBar";
// import WeatherForecastCrad from "./components/WeatherForecastCard";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState();
  const { data, isLoading, isError } = useGetCurrentWeatherQuery(searchTerm);


  // console.log(data);
  
  const handleSubmit = async (term) => {
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
            <span>🌤 {data?.main?.temp}°C</span>
          </div>
        </div>
        <div className="settings">
          <div className="dropdown">
            <button className="dropdown-button">Theme</button>
          </div>
          <div className="dropdown">
            <button className="dropdown-button">°F</button>
          </div>
        </div>
      </header>
      <h1>Current Weather</h1>
      <p>Temperature: {data?.main?.temp}°C</p>
      <p>City: {data?.name}</p>
      {/* <WeatherForecastCrad /> */}
    </>
  );
}

export default App;
