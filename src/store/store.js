import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./slices/homeSlice";
import productsReducer from "./slices/productsSlice";
import cartReducer from './slices/cartSlice'

const store = configureStore({
  reducer: {
    home: homeReducer,
    cart: cartReducer,
    products: productsReducer,
  },
});

export default store;