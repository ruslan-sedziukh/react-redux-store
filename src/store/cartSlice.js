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

        if(element.product.id === action.payload.product.id && _.isEqual(element.attributes, action.payload.attributes)) {
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
    },
    changeAttribute: (state, action) => {
      state[action.payload.index].attributes[action.payload.attribute.id].item = action.payload.attribute.item;
      // console.log('>>>>> Product id: ');
      // console.log(action.payload.productId);
    },
    changeAmount: (state, action) => {
      if(action.payload.action === '+'){
        state[action.payload.index].amount ++;
      } 
      else if (action.payload.action === '-'){
        state[action.payload.index].amount --;
      }
    }
  }
}

const cartSlice = createSlice(options);

export default cartSlice.reducer;
export const { addToCart, changeAttribute, changeAmount } = cartSlice.actions;