import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categoriesSlice.js';

const store = configureStore({
  reducer: {
    categories: categoriesReducer
  }
});

export default store;