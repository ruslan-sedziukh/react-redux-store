import { createSlice } from '@reduxjs/toolkit';

const options = {
  name: 'categories',
  initialState: ['all', 'clothes', 'tech', ],
  reducers: {
    addCategorie: (state, action) => {
      return [...state, action.payload];
    }
  }
}

const categoriesSlice = createSlice(options);

export default categoriesSlice.reducer;
export const { addCategorie } = categoriesSlice.actions;