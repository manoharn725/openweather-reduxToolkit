import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = import.meta.env.VITE_CURRENT_WEATHER_API_KEY;
const baseUrl = "https://api.openweathermap.org";

export const fetchCurrentWeather = createAsyncThunk(
  "weather/fecthCurrentWeather",
  async (city = "neralakatte", { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${baseUrl}/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCitySuggestions = createAsyncThunk(
  "weather/fetchCitySuggestions",
  async (city, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${baseUrl}/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("Something Went Wrong!");
      }
    }
  }
);

export const fetchFivedayWeatherForecast = createAsyncThunk(
  "weather/fetchFivedayWeatherForecast",
  async ({ lat, lon }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${baseUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response?.data);
      } else {
        return rejectWithValue(
          "Something Went Wrong! in fivedays weather forecast"
        );
      }
    }
  }
);
