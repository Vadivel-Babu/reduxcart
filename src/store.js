import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slice/productSlice";

export const store = configureStore({
  reducer:{
    products:cartReducer
  }
})