import { createContext, useEffect, useMemo, useState } from "react";

const GetCurrentDayContext = createContext();

export const GetCurrentDayProvider = ({ children }) => {
  const getcurrentDay = useMemo(() => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date();
    const currentDay = days[date.getDay()];
    console.log(date.getDay());
    return currentDay;
  }, []);

  const getCurrentMonth = useMemo(() => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const date = new Date();
    const currentMonth = months[date.getMonth()];
    const currentDate = date.getDate();
    return `${currentMonth} ${currentDate}`;
  }, []);

  const getCurrentHour = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const Seconds = date.getSeconds().toString().padStart(2, "0");
    const sufix = hours >= 12 ? "PM" : "AM";
    const hours12 = (hours % 12 || 12).toString().padStart(2, "0"); // Convert 0 to 12 for midnight
    const time12 = `${hours12}:${minutes}:${Seconds} ${sufix}`;
    return time12;
  };
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentHour());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <GetCurrentDayContext.Provider
      value={{ getcurrentDay, getCurrentMonth, currentTime }}
    >
      {children}
    </GetCurrentDayContext.Provider>
  );
};

export default GetCurrentDayContext;