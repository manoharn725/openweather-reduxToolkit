import { configureStore } from "@reduxjs/toolkit";
import { currentWeatherApi } from "./api/currentWeatherApi";

export const store = configureStore({
  reducer: {
    [currentWeatherApi.reducerPath]: currentWeatherApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(currentWeatherApi.middleware),
});
