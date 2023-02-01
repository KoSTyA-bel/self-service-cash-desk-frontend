import { createSlice } from '@reduxjs/toolkit';

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const getSelfCheckouts = createAsyncThunk('getSelfCheckouts', async() => {
    const { data } = await axios.get('/api/SelfCheckout?page=1&pageSize=10');
    return data;
});

export const takeSelfCheckout = createAsyncThunk('takeSelfCheckout', async(selfCheckoutId) => {
    const { data } = await axios
        .put(`/api/SelfCheckout/Take/${selfCheckoutId}`)
        .then(({ data }) => {
            localStorage.setItem('guid', JSON.stringify(data));
            localStorage.setItem('selfCheckoutId', JSON.stringify(selfCheckoutId));
            return data
        })
        .catch((error) => {
            if (error.response.status === 400) {
                return null;
            }
        });
});

export const paySelfCheckout = createAsyncThunk('paySelfCheckout', async(params) => {
    const { data } = await axios.post(`/api/SelfCheckout/Pay`, params);
    return data;
});

const initialState = {
    selfCheckouts: { items: [], loading: true },
    cartId: '',
    checkId: '',
};

const selfCheckoutSlice = createSlice({
    name: 'selfCheckout',
    initialState,
    reducers: {},
    extraReducers: {
        [getSelfCheckouts.pending]: (state) => {
            state.selfCheckouts.loading = true;
            state.selfCheckouts.items = [];
        },
        [getSelfCheckouts.fulfilled]: (state, action) => {
            state.selfCheckouts.items = action.payload;
            state.selfCheckouts.loading = false;
        },
        [takeSelfCheckout.fulfilled]: (state, action) => {
            state.cartId = action.payload;
        },
        [paySelfCheckout.fulfilled]: (state, action) => {
            state.checkId = action.payload;
        },
    },
});

export const selfCheckoutReducer = selfCheckoutSlice.reducer;