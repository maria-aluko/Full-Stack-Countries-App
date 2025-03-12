import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { weatherApi } from "../../api/services/weather";
import { WeatherState } from "../../types/weather";
import { RootState } from "../store";

const initialState: WeatherState = {
    weather: [],
    loading: false,
    error: null,
};

export const fetchWeather = createAsyncThunk(
    'weather/fetchWeather',
    async (city: string) => {
        const response = await weatherApi.getWeather(city);
        return response;
    }
);

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        clearWeather: (state) => {
            state.weather = [];
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchWeather.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchWeather.fulfilled, (state, action) => {
            state.loading = false;
            state.weather = [action.payload];
        })
        .addCase(fetchWeather.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string || 'Failed to fetch weather data';
        });
    }
});

export const selectWeather = (state: RootState) => state.weather.weather;
export const selectWeatherLoading = (state: RootState) => state.weather.loading;
export const selectWeatherError = (state: RootState) => state.weather.error;

export const { clearWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
