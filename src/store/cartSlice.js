import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const options = {
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      // Check if this item is already in the cart
      const index = state.findIndex(element => {
        let match = false;

        if(element.id === action.payload.id && _.isEqual(element.attributes, action.payload.attributes)) {
          match = true; 
        }

        return match;
      });

      if(index === -1){
        let payload = action.payload;
        payload.amount = 1;
        state.push(payload);
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