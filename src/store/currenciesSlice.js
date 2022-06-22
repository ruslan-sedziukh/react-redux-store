import { createSlice } from '@reduxjs/toolkit';

const options = {
  name: 'currencies',
  initialState: {},
  reducers: {
    getCurrencies: (state, action) => {
      const newCurrencies = {...state, currencies: action.payload};
      return newCurrencies;
    },
    setCurrency: (state, action) => {
      const newCurrencies = {...state, currency: action.payload};
      return newCurrencies;
    }
  }
}

const currenciesSlice = createSlice(options);

export default currenciesSlice.reducer;
export const { getCurrencies, setCurrency } = currenciesSlice.actions;