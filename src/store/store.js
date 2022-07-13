import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categoriesSlice.js';
import currenciesReducer from './currenciesSlice.js';
import cartReducer from './cartSlice.js';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "redux"; 
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  categories: categoriesReducer,
  currencies: currenciesReducer,
  cart: cartReducer
});

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
});

export default store; 