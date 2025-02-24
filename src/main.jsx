import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import { UnixToLocalTimeContextProvider } from "./context/UnixToLocalTime/UnixToLocalTimeContext.jsx";
import { ConvertToCelsiusProvider } from "./context/ConvertToCelsius/ConvertToCelsiusContext.jsx";
import { GetCurrentDayProvider } from "./context/GetCurrentDay/GetCurrentDayContext.jsx";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <UnixToLocalTimeContextProvider>
        <ConvertToCelsiusProvider>
          <GetCurrentDayProvider>
            <App />
          </GetCurrentDayProvider>
        </ConvertToCelsiusProvider>
      </UnixToLocalTimeContextProvider>
    </Provider>
  </StrictMode>
);
