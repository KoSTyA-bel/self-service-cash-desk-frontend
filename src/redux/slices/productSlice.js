import { createSlice } from '@reduxjs/toolkit';

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const getProducts = createAsyncThunk('getProducts', async(page) => {
    const { data } = await axios.get(`/api/Stock?page=${page}&pageSize=5`);
    return data;
});

const initialState = {
    products: { items: [], loading: true },
    page: 1
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        nextPage: (state) => {
            state.page++
        },
        prevPage: (state) => {
            if (state.page !== 1) {
                state.page--
            }
        }
    },
    extraReducers: {
        [getProducts.pending]: (state) => {
            state.products.loading = true;
            state.products.items = [];
        },
        [getProducts.fulfilled]: (state, action) => {
            state.products.items = action.payload;
            state.products.loading = false;
        },
        [getProducts.rejected]: (state) => {
            state.products.loading = false;
            state.products.items = [];
            state.page--
        }
    },
});


export const {
    nextPage,
    prevPage
} = productSlice.actions;

export const productReducer = productSlice.reducer;