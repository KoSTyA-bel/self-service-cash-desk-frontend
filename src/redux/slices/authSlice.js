import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAuth = createAsyncThunk("fetchAuth", async (params) => {
  const data = await axios
    .post("/api/Auth", params)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response;
    });
  return data;
});

const initialState = {
  data: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAuth.fulfilled]: (state, action) => {
      state.data = action.payload;
      localStorage.setItem("jwt", state.data.token);
    },
  },
});

export const authReducer = authSlice.reducer;
