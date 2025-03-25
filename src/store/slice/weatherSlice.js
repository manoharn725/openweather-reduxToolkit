import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCurrentWeather,
  fetchCitySuggestions,
  fetchFivedayWeatherForecast,
} from "../asyncThunk/weatherApi";

const initialState = {
  currentWeather: {
    data: null,
    isLoading: false,
    isError: null,
  },
  citySuggestions: {
    data: [],
    isLoading: false,
    isError: null,
  },
  fivedayWeatherForecast: {
    data: null,
    isLoading: false,
    isError: null,
  },
};
const weatherSlice = createSlice({
  name: "weather",
  initialState: initialState,
  reducers: {}, //sync logic here
  extraReducers: (builder) => {
    //async logic here
    builder
      .addCase(fetchCurrentWeather.pending, (state) => {
        state.currentWeather.isLoading = true;
        state.currentWeather.isError = null;
      })
      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        state.currentWeather.isLoading = false;
        state.currentWeather.data = action.payload;
      })
      .addCase(fetchCurrentWeather.rejected, (state, action) => {
        state.currentWeather.isLoading = false;
        state.currentWeather.isError =
          action.payload?.message || "Failed to fetch current weather";
      })

      .addCase(fetchCitySuggestions.pending, (state) => {
        state.citySuggestions.isLoading = true;
        state.citySuggestions.isError = null;
      })
      .addCase(fetchCitySuggestions.fulfilled, (state, action) => {
        state.citySuggestions.isLoading = false;
        state.citySuggestions.data = action.payload;
      })
      .addCase(fetchCitySuggestions.rejected, (state, action) => {
        state.citySuggestions.isLoading = false;
        state.citySuggestions.isError =
          action.payload?.message || "Failed to fetch city suggestions";
      })

      .addCase(fetchFivedayWeatherForecast.pending, (state) => {
        state.fivedayWeatherForecast.isLoading = true;
        state.fivedayWeatherForecast.isError = null;
      })
      .addCase(fetchFivedayWeatherForecast.fulfilled, (state, action) => {
        state.fivedayWeatherForecast.isLoading = false;
        state.fivedayWeatherForecast.data = action.payload;
      })
      .addCase(fetchFivedayWeatherForecast.rejected, (state, action) => {
        state.fivedayWeatherForecast.isLoading = false;
        state.fivedayWeatherForecast.isError =
          action.payload?.message || "Failed to fetch forecast";
      });
  },
});

export default weatherSlice.reducer;
