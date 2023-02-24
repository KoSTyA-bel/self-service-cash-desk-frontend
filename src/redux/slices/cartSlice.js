import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const addProduct = createAsyncThunk(
  "addProduct",
  async (requestData) => {
    const { data } = await axios.put(
      `/api/Cart/Add`,
      JSON.stringify(requestData),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return data;
  }
);

export const removeProduct = createAsyncThunk(
  "removeProduct",
  async (requestData) => {
    const { data } = await axios.put(
      `/api/Cart/Remove`,
      JSON.stringify(requestData),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return data;
  }
);

export const updateCart = createAsyncThunk("updateCart", async (number) => {
  const { data } = await axios.get(`/api/Cart/${number}`);
  return data;
});

const initialState = {
  cart: { items: [], loading: true },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: {
    [addProduct.pending]: (state) => {
      state.cart.loading = true;
    },
    [addProduct.fulfilled]: (state) => {
      state.cart.loading = false;
    },
    [removeProduct.pending]: (state) => {
      state.cart.loading = true;
    },
    [removeProduct.fulfilled]: (state) => {
      state.cart.loading = false;
    },
    [updateCart.pending]: (state) => {
      state.cart.loading = true;
    },
    [updateCart.fulfilled]: (state, action) => {
      state.cart.loading = false;
      state.cart.items = action.payload;
    },
  },
});

export const cartReducer = cartSlice.reducer;
