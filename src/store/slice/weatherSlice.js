import { createSlice } from "@reduxjs/toolkit";
import { fetchCurrentWeather } from "../asyncThunk/weatherApi";
import { fetchCitySuggestions } from "../asyncThunk/weatherApi";
import { fetchFivedayWeatherForecast } from "../asyncThunk/weatherApi";

const initialState = {
  currentWeather: null,
  citySuggestions: [],
  fiveDayWeatherForecast: null,
  isLoading: false,
  isError: null,
};
const weatherSlice = createSlice({
  name: "weather",
  initialState: initialState,
  reducers: {}, //sync logic here
  extraReducers: (builder) => {
    //async logic here
    builder
      .addCase(fetchCurrentWeather.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentWeather = action.payload;
      })
      .addCase(fetchCurrentWeather.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(fetchCitySuggestions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCitySuggestions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.citySuggestions = action.payload;
      })
      .addCase(fetchCitySuggestions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(fetchFivedayWeatherForecast.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFivedayWeatherForecast.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fiveDayWeatherForecast = action.payload;
      })
      .addCase(fetchFivedayWeatherForecast.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export default weatherSlice.reducer;
