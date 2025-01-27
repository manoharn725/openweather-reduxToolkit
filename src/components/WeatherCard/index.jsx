import { useUnixToLocalTimeContext } from "../../context/UnixToLocalTime/useUnixToLocalTimeContext";
import { useConvertToCelsiusContext } from "../../context/ConvertToCelsius/useConvertToCelsiusContext";
import "./index.css";

const WeatherCard = ({ data }) => {
  const { convertUnixToLocalTime, convertUnixToFormattedDate } =
    useUnixToLocalTimeContext();
  const convertToCelsius = useConvertToCelsiusContext();

  return (
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
          {convertUnixToLocalTime(data?.sys?.sunrise)}
        </div>
        <div>
          <img
            src="https://img.icons8.com/emoji/48/000000/sunset-emoji.png"
            alt="Sunset"
          />{" "}
          {convertUnixToLocalTime(data?.sys?.sunset)}
        </div>
      </div>

      <footer>Last updated: {convertUnixToFormattedDate(data?.dt)}</footer>
    </div>
  );
};

export default WeatherCard;
