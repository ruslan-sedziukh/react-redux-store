import { createSlice } from '@reduxjs/toolkit';

const options = {
  name: 'categories',
  initialState: ['ALL'],
  reducers: {
    addCategorie: (state, action) => {
      return [...state, action.payload];
    }
  }
}

const categoriesSlice = createSlice(options);

export default categoriesSlice.reducer;
export const { addCategorie } = categoriesSlice.actions;