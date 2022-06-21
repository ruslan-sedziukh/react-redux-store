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
      // It`s probably ok that products are overwritten every time and 
      // more detailed data fetched before is gone because still we fetch
      // new detailed data about product every time we open product page. 
      const newState = {...state, [action.payload.category]: { products: action.payload.products} };
      return newState;
    }
  }
}

const categoriesSlice = createSlice(options);

export default categoriesSlice.reducer;
export const { getCategories, getProducts } = categoriesSlice.actions;