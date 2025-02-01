import { createContext } from "react";

const ConvertToCelsiusContext = createContext();

export const ConvertToCelsiusProvider = ({ children }) => {
  const convertToCelsius = (kelvin) => (kelvin - 273.15).toFixed(2);
  return (
    <ConvertToCelsiusContext.Provider value={{ convertToCelsius }}>
      {children}
    </ConvertToCelsiusContext.Provider>
  );
};

export default ConvertToCelsiusContext;