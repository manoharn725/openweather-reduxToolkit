import { useState } from "react";
import { useGetFivedayWeatherForecastQuery } from "../../store/api/currentWeatherApi";
import { useUnixToLocalTimeContext } from "../../context/UnixToLocalTime/useUnixToLocalTimeContext";
import { useConvertToCelsiusContext } from "../../context/ConvertToCelsius/useConvertToCelsiusContext";
import "./index.css";

const WeatherForecastCrad = ({ lat, lon }) => {
  const { data } = useGetFivedayWeatherForecastQuery({ lat, lon });
  // console.log(data?.list?.map((d) => console.log(d)));
  // console.log(lat, lon);
  const { convertUnixToFormattedDate, convertUnixToLocalTime } =
    useUnixToLocalTimeContext();
  const convertToCelsius = useConvertToCelsiusContext();

  const currentDate = new Date(); 
  const numberOfDays = [0, 1, 2, 3, 4, 5];

  // Add days
  const upComingDays = numberOfDays.map((day) => {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() + day);
    return date.toUTCString().split(" ").splice(0, 4).join(" ");
  });

  const [selectedDay, setSelectedDay] = useState(upComingDays[0]);
  
  const filteredData = data?.list?.filter(
    (data) => convertUnixToFormattedDate(data?.dt) === selectedDay
  );

  return (
    <>
    <h1>Five Days Forecast</h1>
      <select
        value={selectedDay}
        onChange={(e) => setSelectedDay(e.target.value)}
        name="data-selector"
      >
        {upComingDays.map((day, index) => (
          <option key={index}>{day}</option>
        ))}
      </select>
      <div className="weather-forecast-card__container">
        {filteredData?.map((data, index) => (
          <div className="weather-forecast-card" key={index}>
            <h3>{convertUnixToFormattedDate(data?.dt)}</h3>
            <h3>{convertUnixToLocalTime(data?.dt, 3600)}</h3>
            <p>
              <strong>Date:</strong> {data?.dt_txt}
            </p>
            <p>
              <strong>Temperature:</strong> {convertToCelsius(data?.main?.temp)}
              °C
            </p>
            <p>
              <strong>Feels Like:</strong>{" "}
              {convertToCelsius(data?.main?.feels_like)}°C
            </p>
            <p>
              <strong>Min Temp:</strong>{" "}
              {convertToCelsius(data?.main?.temp_min)}
              °C
            </p>
            <p>
              <strong>Max Temp:</strong>{" "}
              {convertToCelsius(data?.main?.temp_max)}
              °C
            </p>
            <p>
              <strong>Humidity:</strong> {data?.main?.humidity}%
            </p>
            <p>
              <strong>Weather:</strong> {data?.weather[0].description}
            </p>

            <p>
              <strong>Wind Speed:</strong> {data?.wind?.speed} m/s
            </p>
            <p>
              <strong>Wind Gust:</strong> {data?.wind?.gust} m/s
            </p>
            <p>
              <strong>Visibility:</strong> {data?.visibility / 1000} km
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default WeatherForecastCrad;
