import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categoriesSlice.js';
import currenciesReducer from './currenciesSlice.js';
import cartReducer from './cartSlice.js';

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    currencies: currenciesReducer,
    cart: cartReducer
  }
});

export default store; 