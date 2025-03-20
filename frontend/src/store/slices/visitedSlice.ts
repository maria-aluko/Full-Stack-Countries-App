import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Country } from '../../types/country';

interface VisitedCountriesState {
  visited: Country[];
}

const initialState: VisitedCountriesState = {
  visited: [],
};

const visitedCountriesSlice = createSlice({
  name: 'visitedCountries',
  initialState,
  reducers: {
    addVisitedCountry(state, action: PayloadAction<Country>) {
      if (!state.visited.find(c => c.cca3 === action.payload.cca3)) {
        state.visited.push(action.payload);
      }
    },
    removeVisitedCountry(state, action: PayloadAction<string>) {
      state.visited = state.visited.filter(c => c.cca3 !== action.payload);
    },
  },
});

export const { addVisitedCountry, removeVisitedCountry } = visitedCountriesSlice.actions;
export default visitedCountriesSlice.reducer;