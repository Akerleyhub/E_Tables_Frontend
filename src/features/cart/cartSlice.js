/*
  New redux logic, basicially state management logic for cart. Methods are called here in other places with dispatch
*/

import { createSlice } from '@reduxjs/toolkit';

//will be putting a number of json objects in each
const initialState = {
    cart:[]
};


export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addMenuItems: (state,action) =>{
        //console.log('moving the payload: ',action.payload)
        //adding what should be an array of json values
        for(let x of action.payload){
            state.cart.push(JSON.parse(x));
        }
    },
    deleteMenuItems: (state,action)=>{
        const itemId = action.payload;
        state.cart = state.cart.filter((item)=> item.id !== itemId);
    },
    clearCart: (state) =>{
      state.cart = [];
    }
  },

});

export const { addMenuItems, deleteMenuItems, clearCart } = cartSlice.actions;


export const viewCart = (state) => state.cart;


export default cartSlice.reducer;
