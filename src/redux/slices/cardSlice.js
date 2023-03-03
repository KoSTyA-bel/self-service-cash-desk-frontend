import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const getCards = createAsyncThunk("getCards", async (params) => {
  const { data } = await axios.get("/api/Card?page=1&pageSize=20");
  return data;
});

export const getRoles = createAsyncThunk("getRoles", async (params) => {
  const { data } = await axios.get("/api/Role?page=1&pageSize=20");
  return data;
});

export const createProfile = createAsyncThunk(
  "createProfile",
  async (params) => {
    const data = await axios
      .post("/api/Profile", params)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
    return data;
  }
);

export const deleteProfile = createAsyncThunk(
  "deleteProfile",
  async (params) => {
    const { data } = await axios.delete(`/api/Profile/${params}`);
    return data;
  }
);

export const createCard = createAsyncThunk("createCard", async (params) => {
  const data = await axios
    .post("/api/Card", params)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response;
    });
  return data;
});

export const updateCard = createAsyncThunk("updateCard", async (params) => {
  const data = await axios
    .put(`/api/Card/${params.id}`, params.data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response;
    });
  return data;
});

export const deleteCard = createAsyncThunk("deleteCard", async (params) => {
  const { data } = await axios.delete(`/api/Card/${params}`);
  return data;
});

const initialState = {
  cards: null,
  profiles: null,
  roles: null,
  card: null,
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    writeCard: (state, action) => {
      state.card = action.payload;
    },
  },
  extraReducers: {
    [getCards.fulfilled]: (state, action) => {
      state.cards = action.payload;
    },
    [getRoles.fulfilled]: (state, action) => {
      state.roles = action.payload;
    },
  },
});

export const { writeCard } = cardSlice.actions;

export const cardReducer = cardSlice.reducer;
