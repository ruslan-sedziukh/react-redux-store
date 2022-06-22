import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categoriesSlice.js';
import currenciesReducer from './currenciesSlice.js';

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    currencies: currenciesReducer
  }
});

export default store;