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

        if (element.product.id === action.payload.product.id && _.isEqual(element.attributes, action.payload.attributes)) {
          match = true;
        }

        return match;
      });

      if (index === -1) {
        let payload = action.payload;
        payload.amount = 1;
        state.push(payload);
      }
      else {
        state[index].amount++;
      }
    },
    changeAttribute: (state, action) => {
      let newState = JSON.parse(JSON.stringify(state));
      newState[action.payload.index].attributes[action.payload.attribute.id].item = action.payload.attribute.item;
      
      // Stack items with same attributes
      let shouldStack = false;
      let stackIndex;

      // Chech if there is item with such attributes and change its ammount
      for(let i = 0; i < state.length; i++) {
        if(i !== action.payload.index) {
          if(_.isEqual(newState[action.payload.index].attributes, newState[i].attributes)) {
            if(i < action.payload.index) {
              newState[i].amount = newState[i].amount + newState[action.payload.index].amount;
              stackIndex = action.payload.index;
            }
            else {
              newState[action.payload.index].amount = newState[i].amount + newState[action.payload.index].amount;
              stackIndex = i;
            }
            shouldStack = true;
          }
        }
      }

      if(shouldStack) {
        let veryNewState = [];
          for(let i = 0; i < newState.length; i++) {
            if(i !== stackIndex) {
              veryNewState.push(newState[i]);
            }
          }; 
          return veryNewState;
      } 
      else {
        return newState;
      }
    },
    changeAmount: (state, action) => {
      if (action.payload.action === '+') {
        state[action.payload.index].amount++;
      }
      else if (action.payload.action === '-') {
        if (state[action.payload.index].amount <= 1) {
          const newState = [];
          for(let i = 0; i < state.length; i++) {
            if(i !== action.payload.index) {
              newState.push(state[i]);
            }
          } 
          return newState;
        }
        else {
          state[action.payload.index].amount--;
        }
      }
    }
  }
}

const cartSlice = createSlice(options);

export default cartSlice.reducer;
export const { addToCart, changeAttribute, changeAmount } = cartSlice.actions;