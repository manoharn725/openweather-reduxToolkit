import { useEffect, useState } from "react";
import { fetchFivedayWeatherForecast } from "../../store/asyncThunk/weatherApi";
import { useUnixToLocalTimeContext } from "../../context/UnixToLocalTime/useUnixToLocalTimeContext";
import { useConvertToCelsiusContext } from "../../context/ConvertToCelsius/useConvertToCelsiusContext";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";

const WeatherForecastCrad = ({ lat, lon, dataForGraph }) => {
  const dispatch = useDispatch();
  const { fivedayWeatherForecast } = useSelector((state) => state.weather);
  useEffect(() => {
    if (lat && lon) {
      dispatch(fetchFivedayWeatherForecast({ lat, lon }));
    }
  }, [lat, lon, dispatch]);

  const { convertUnixToFormattedDate, convertUnixTo12HoursFormate } =
    useUnixToLocalTimeContext();
  const { convertToCelsius } = useConvertToCelsiusContext();

  const currentDate = new Date();
  const numberOfDays = [0, 1, 2, 3, 4, 5];

  const upComingDays = numberOfDays.map((day) => {
    const date = new Date(currentDate);

    date.setDate(currentDate.getDate() + day);
    return date.toUTCString().split(" ").splice(0, 4).join(" ");
  });

  const [selectedDay, setSelectedDay] = useState(upComingDays[0]);

  const filteredData = fivedayWeatherForecast?.list?.filter(
    (data) => convertUnixToFormattedDate(data?.dt) === selectedDay
  );

  useEffect(() => {
    if (dataForGraph) {
      dataForGraph(filteredData);
    }
  }, [fivedayWeatherForecast, selectedDay]);

  return (
    <div className="weather-forecast-card__wrapper">
      {/* <select
        value={selectedDay}
        onChange={(e) => setSelectedDay(e.target.value)}
        name="data-selector"
      >
        {upComingDays.map((day, index) => (
          <option key={index}>{day}</option>
        ))}
      </select>  */}
      <div className="weather-forecast-card__upcoming-days">
        {upComingDays.map((day, index) => (
          <span
            className={`${selectedDay === day ? "active" : "inactive"}`}
            key={index}
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </span>
        ))}
      </div>
      <div className="weather-forecast-card__container">
        {filteredData?.map((data, index) => (
          <div className="weather-forecast-card" key={index}>
            <div className="weather-forecast-card--date">
              {/* {convertUnixToFormattedDate(data?.dt)} */}
              <span>
                {" "}
                {convertUnixTo12HoursFormate(data?.dt_txt.split(" ")[1])}
              </span>
            </div>
            <div className="weather-forecast-card--divider">
              <div className="weather-forecast-card--temp">
                <span>
                  🌡{convertToCelsius(data?.main?.temp_max)}
                  °C
                </span>
                <span>
                  🌡️{convertToCelsius(data?.main?.temp_min)}
                  °C
                </span>
                <span>💨{data?.wind?.speed} m/s</span>
                <span>🫧{data?.main?.humidity}%</span>
              </div>
              <img
                src={`https://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`}
                alt=""
                className="weather-forecast-card--icon"
              />
            </div>
            <div className="weather-forecast-card--description">
              {data?.weather[0].description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecastCrad;
