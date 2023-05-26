import { configureStore, createReducer } from '@reduxjs/toolkit';
import menuReducer from '../features/menu/menuSlice';
import cartReducer from '../features/cart/cartSlice';
//import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    cart :cartReducer,
    //counter: counterReducer,
  },
});
