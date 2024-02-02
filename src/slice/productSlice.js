import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const getDataFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('cartItems')) || [];
}

let initialState = {
  products:[],
  cart:getDataFromLocalStorage(),
};


const URL ='https://dummyjson.com/products'

export const fetchProducts = createAsyncThunk('products/fetchProducts',async()=>{
  const res = await axios.get(URL);
  return res.data
})

const cartSlice = createSlice({
  name:'products',
  initialState,
  reducers:{
    addToCart(state,action){
      state.cart.push(action.payload)
      localStorage.setItem('cartItems',JSON.stringify(state.cart.map((item) => item)))
    },
    removeItem(state,action){
      const filtered = state.cart.filter((c) => c.id !== action.payload)
      state.cart = filtered
      localStorage.setItem('cartItems',JSON.stringify(state.cart.map((item) => item)))
    },
    emptyCart(state){
      state.cart = []
      localStorage.setItem('cartItems',JSON.stringify(state.cart.map((item) => item)))
    },
    increaseQuantity(state,action){
      state.cart = state.cart.map((item) => {
        if(item.id === action.payload){
          item.quantity += 1
        }
        return item
      })
      localStorage.setItem('cartItems',JSON.stringify(state.cart.map((item) => item)))
    },
     decreaseQuantity(state,action){
      state.cart = state.cart.map((item) => {
        if(item.id === action.payload  && item.quantity > 1){
          item.quantity -= 1
        }
        return item
      })
      localStorage.setItem('cartItems',JSON.stringify(state.cart.map((item) => item)))
    }
  },
  extraReducers(builder){
    builder.addCase(fetchProducts.fulfilled,(state,action) => {
      console.log(action.payload)
      const products = action.payload
      state.products = products
    })
  }
})

export const getProducts = (state) => state.products.products
export const cart = (state) => state.products.cart;
export const {addToCart,removeItem,emptyCart,decreaseQuantity,increaseQuantity} = cartSlice.actions
export default cartSlice.reducer