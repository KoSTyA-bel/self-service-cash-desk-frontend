import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const getCheck = createAsyncThunk("getCheck", async (number) => {
  const { data } = await axios.get(`/api/Check/${number}`);
  return data;
});

export const getCard = createAsyncThunk("getCard", async (code) => {
  let newCode = code.replace(/#/g, "%23");
  const { data } = await axios.get(`/api/Card/ByCode/${newCode}`);
  return data;
});

export const viewHistory = createAsyncThunk("viewHistory", async (params) => {
  const { data } = await axios.get(
    `/api/Check/History?page=1&pageSize=20&card=${params.code}&cvv=${params.cvv}`
  );
  return data;
});

const initialState = {
  check: { data: null, card: null, loading: true },
  checks: null,
};

const checkSlice = createSlice({
  name: "check",
  initialState,
  reducers: {},
  extraReducers: {
    [getCheck.pending]: (state) => {
      state.check.loading = true;
    },
    [getCheck.fulfilled]: (state, action) => {
      state.check.loading = false;
      state.check.data = action.payload;
    },
    [getCard.pending]: (state) => {
      state.check.loading = true;
    },
    [getCard.fulfilled]: (state, action) => {
      state.check.loading = false;
      state.check.card = action.payload;
    },
    [viewHistory.fulfilled]: (state, action) => {
      state.checks = action.payload;
    },
    [viewHistory.rejected]: (state) => {
      state.checks = null;
    },
  },
});

export const checkReducer = checkSlice.reducer;
