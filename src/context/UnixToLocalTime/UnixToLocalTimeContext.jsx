import { createContext } from "react";

export const UnixToLocalTimeContext = createContext();

export const UnixToLocalTimeContextProvider = ({ children }) => {
    const convertUnixToLocalTime = (unixTimestamp, timezone=19800) => {
      const date = new Date((unixTimestamp + timezone) * 1000);
      // console.log(date.toLocaleString)
      return date.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    };
    const convertUnixToFormattedDate = (unixTimestamp) => {
        const date = new Date(unixTimestamp * 1000);
        // console.log(date.toUTCString)
        return date.toUTCString().split(' ').splice(0,4).join(' ')
    }
    return (
      <UnixToLocalTimeContext.Provider value={{convertUnixToLocalTime, convertUnixToFormattedDate}}>
        {children}
      </UnixToLocalTimeContext.Provider>
    );
  };
