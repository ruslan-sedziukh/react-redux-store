import { createSlice } from '@reduxjs/toolkit';

const options = {
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const index = state.findIndex(element => {
        return element.id === action.payload.id;
      });

      if(index === -1){
        state.push(action.payload);
      } 
      else {
        state[index].amount ++;
      }
    }
  }
}

const cartSlice = createSlice(options);

export default cartSlice.reducer;
export const { addToCart } = cartSlice.actions;