import { createSlice } from '@reduxjs/toolkit';

const options = {
  name: 'categories',
  initialState: [ ],
  reducers: {
    getCategories: (state, action) => {
      return [...action.payload];
    }
  }
}

const categoriesSlice = createSlice(options);

export default categoriesSlice.reducer;
export const { getCategories } = categoriesSlice.actions;