import { useState } from "react";
import { useGetCurrentWeatherQuery } from "./store/api/currentWeatherApi";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import WeatherForecastCrad from "./components/WeatherForecastCard";
import HumidityChart from "./components/HumidityChart";
import TemperatureGraph from "./components/TemperatureGraph";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState();
  const [graphData, setGraphData] = useState([]);
  const { data, isLoading, isError } = useGetCurrentWeatherQuery(searchTerm);

  const handleSubmit = (term) => {
    setSearchTerm(term);
  };
 
  const updateGraphData = (dataForGraph) => {
    setGraphData(dataForGraph);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {isError.message}</p>;
  return (
    <div className="app">
      <header className="header">
        <SearchBar onFormSubmit={handleSubmit} />
        <div className="app-theme">
          <span>Theme</span>
        </div>
      </header>

      <div className="card__details">
        <WeatherCard data={data} />
        <div className="app__right-side">
          <div className="app__right-side--top-section">
          
          <TemperatureGraph forecastData={graphData} />
          <HumidityChart forecastData={graphData} />
          </div>
         
          <WeatherForecastCrad
            dataForGraph={updateGraphData}
            lat={data?.coord?.lat}
            lon={data?.coord?.lon}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
