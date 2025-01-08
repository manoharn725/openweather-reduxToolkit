import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import { UnixToLocalTimeContextProvider } from "./components/context/UnixToLocalTime/UnixToLocalTimeContext.jsx";
import { ConvertToCelsiusProvider } from "./components/context/ConvertToCelsius/ConvertToCelsiusContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <UnixToLocalTimeContextProvider>
        <ConvertToCelsiusProvider>
          <App />
        </ConvertToCelsiusProvider>
      </UnixToLocalTimeContextProvider>
    </Provider>
  </StrictMode>
);
