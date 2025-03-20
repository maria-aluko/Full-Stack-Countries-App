import { configureStore } from '@reduxjs/toolkit';
import countriesReducer from './slices/countriesSlice';
import testReducer from './slices/testSlice';
import weatherReducer from './slices/weatherSlice';
import visitedCountriesReducer from './slices/visitedSlice';

export const store = configureStore({
  reducer: {
    test: testReducer,
    countries: countriesReducer,
    weather: weatherReducer,
    visitedCountries: visitedCountriesReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;