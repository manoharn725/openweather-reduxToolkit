import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = import.meta.env.VITE_CURRENT_WEATHER_API_KEY;
console.log("apiKey:", apiKey);

export const currentWeatherApi = createApi({
  reducerPath: "currentWeatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.openweathermap.org",
  }),
  tagTypes: ["GetCurrentWeather", "GetCitySuggestions"],
  endpoints: (builder) => ({
    getCurrentWeather: builder.query({
      query: (city = "neralakatte") => ({
        url: `/data/2.5/weather?q=${city}&appid=${apiKey}`,
        method: "GET",
        providesTags: ["GetCurrentWeather"],
      }),
    }),
    getCitySuggestions: builder.query({
      query: (city) => ({
        url: `/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`,
        method: "GET",
      }),
    }),
    getFivedayWeatherForecast: builder.query({
      query: ({lat, lon}) => ({
        url: `/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`,
        method: "GET",
      })
    })
  }),
});

export const { useGetCurrentWeatherQuery, useGetCitySuggestionsQuery, useGetFivedayWeatherForecastQuery } =
  currentWeatherApi;
