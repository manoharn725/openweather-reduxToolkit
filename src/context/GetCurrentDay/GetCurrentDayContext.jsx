import { createContext } from "react";

export const GetCurrentDayContext = createContext();

export const GetCurrentDayProvider = ({ children }) => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const date = new Date();
  const getcurrentDay = () => {
    const currentDay =  days[date.getDay()]
    return currentDay;
  };
  return (
    <GetCurrentDayContext.Provider value={getcurrentDay}>
      {children}
    </GetCurrentDayContext.Provider>
  );
};
