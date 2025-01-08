import { useState } from "react";
import { useGetCurrentWeatherQuery } from "./store/api/currentWeatherApi";
import SearchBar from "./components/SearchBar";
// import WeatherForecastCrad from "./components/WeatherForecastCard";
import { useUnixToLocalTimeContext } from "./components/context/UnixToLocalTime/useUnixToLocalTimeContext";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState();
  const { data, isLoading, isError } = useGetCurrentWeatherQuery(searchTerm);
  const {convertUnixToLocalTime, convertUnixToFormattedDate} = useUnixToLocalTimeContext();

  
  console.log(data);
  const convertToCelsius = (kelvin) => (kelvin - 273.15).toFixed(2);
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
        
      </header>
      <h1>Current Weather</h1>
      {/* weather-container */}
      {/* {data.map((data) => ( */}
      <div className="weather-container" key={data?.id}>
        <div className="location">
          {data?.name}, {data?.sys?.country}
        </div>
        <img
          className="icon"
          src={`https://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`}
          alt={data?.weather[0]?.description}
        />
        <div className="temperature">
          {convertToCelsius(data?.main?.temp)}&#8451;
        </div>
        <div className="description">{data?.weather[0]?.description}</div>

        <div className="details">
          <div className="detail">Humidity: {data?.main?.humidity}</div>
          <div className="detail">Pressure: {data?.main?.pressure} hPa</div>
          <div className="detail">Wind Speed: {data?.wind?.speed} m/s</div>
          <div className="detail">Visibility: {data?.visibility / 1000} km</div>
        </div>

        <div className="sun-info">
          <div>
            <img
              src="https://img.icons8.com/emoji/48/000000/sunrise-emoji.png"
              alt="Sunrise"
            />{" "}
            {convertUnixToLocalTime(data?.sys?.sunrise, data?.timezone)}
          </div>
          <div>
            <img
              src="https://img.icons8.com/emoji/48/000000/sunset-emoji.png"
              alt="Sunset"
            />{" "}
            {convertUnixToLocalTime(data?.sys?.sunset,data?.timezone)}
          </div>
        </div>

        <footer>Last updated: {convertUnixToFormattedDate(data?.dt)}</footer>
      </div>
      {/* ))} */}

      {/* <WeatherForecastCrad /> */}
    </>
  );
}

export default App;
