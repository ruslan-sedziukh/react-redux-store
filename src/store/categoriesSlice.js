import { createSlice } from '@reduxjs/toolkit';

const options = {
  name: 'categories',
  initialState: {},
  reducers: {
    getCategories: (state, action) => {
      // getCategories is checking if this category already exist 
      // to prevent accidental replacement of the category with blank object
      const newCategories = {};
      for (let category in action.payload) {
        if(state[category]) {
          newCategories[category] = state[category];
        }
        else {
          newCategories[category] = action.payload[category];
        }
      }
      return newCategories;
    },
    getProducts: (state, action) => {
      const newState = {...state, [action.payload.category]: action.payload.products};
      console.log('newState: ');
      console.log(newState);
      return newState;
    }
  }
}

const categoriesSlice = createSlice(options);

export default categoriesSlice.reducer;
export const { getCategories, getProducts } = categoriesSlice.actions;