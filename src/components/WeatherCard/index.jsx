import { useUnixToLocalTimeContext } from "../../context/UnixToLocalTime/useUnixToLocalTimeContext";
import { useConvertToCelsiusContext } from "../../context/ConvertToCelsius/useConvertToCelsiusContext";
import "./index.css";
import { useGetCurrentDayContext } from "../../context/GetCurrentDay/useGetCurrentDayContext";

const WeatherCard = ({ data }) => {
  const { convertUnixToLocalTime, convertUnixToFormattedDate } =
    useUnixToLocalTimeContext();
  const convertToCelsius = useConvertToCelsiusContext();
  const getcurrentDay = useGetCurrentDayContext();
  console.log('check',getcurrentDay())
// const currentDate = new Date()
// console.log(currentDate, currentDate.getDay(),  currentDate.getMinutes(), currentDate.getSeconds())
  return (
    <div className="weather-container" key={data?.id}>
      <div className="location">
        {data?.name}, {data?.sys?.country}
      </div>
      <div>{getcurrentDay()}</div>
      <img
        className="weather__card--icon"
        src={`https://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`}
        alt={data?.weather[0]?.description}
      />
      <div className="description">{data?.weather[0]?.description}</div>
      <div className="temperature">
        {convertToCelsius(data?.main?.temp)}&#8451;
      </div>
      
      <div className="feels__like">Feels Like {convertToCelsius(data?.main?.feels_like)}&#8451;</div>

      <div className="details">
        <div className="detail"><span>Wind Speed:</span> <span>💨{data?.wind?.speed} m/s</span></div>
        <div className="detail"><span>Humidity:</span> <span>🫧{data?.main?.humidity}%</span></div>
        <div className="detail"><span>Pressure:</span> <span>🗜{data?.main?.pressure} hPa</span></div>
        <div className="detail"><span>Wind Gust:</span> <span>🍃{data?.wind?.gust} m/s</span></div>
        <div className="detail"><span>Sea Level:</span> <span>🌊{data?.main?.sea_level} hPa</span></div>
        <div className="detail"><span>Ground Level:</span> <span>⛰️{data?.main?.grnd_level} hPa</span></div>
        <div className="detail"><span>Visibility:</span> <span>🛣️{data?.visibility / 1000} km</span></div>
      </div>

      <div className="sun-info">
        <div> 🌄 {convertUnixToLocalTime(data?.sys?.sunrise)}</div>
        <div>🌅 {convertUnixToLocalTime(data?.sys?.sunset)}</div>
      </div>

      <footer>Last updated: {convertUnixToFormattedDate(data?.dt)}</footer>
    </div>
  );
};

export default WeatherCard;
