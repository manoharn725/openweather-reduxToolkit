import { createContext } from "react";

const UnixToLocalTimeContext = createContext();

export const UnixToLocalTimeContextProvider = ({ children }) => {
  const convertUnixToLocalTime = (unixTimestamp = 1737854757) => {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });
  };
  const convertUnixToFormattedDate = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000);
    return date.toUTCString().split(" ").splice(0, 4).join(" ");
  };

  const convertUnixTo12HoursFormate = (time24) => {
    const [hours, minutes] = time24.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const hours12 = hours % 12 || 12; // Convert 0 to 12 for midnight
    const time12 = `${hours12}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`;
      return time12;
  };
  return (
    <UnixToLocalTimeContext.Provider
      value={{ convertUnixToLocalTime, convertUnixToFormattedDate, convertUnixTo12HoursFormate }}
    >
      {children}
    </UnixToLocalTimeContext.Provider>
  );
};

export default UnixToLocalTimeContext;