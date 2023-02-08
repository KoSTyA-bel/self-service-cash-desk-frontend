import { createSlice } from '@reduxjs/toolkit';

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const getCheck = createAsyncThunk('getCheck', async(number) => {
    const { data } = await axios.get(`/api/Check/${number}`);
    return data;
});

export const getCard = createAsyncThunk('getCard', async(code) => {
    console.log(code);
    let alala = code.replace(/#/g, '%23')
    console.log(alala)
    const { data } = await axios.get(`/api/Card/ByCode/${alala}`);
    return data;
});

const initialState = {
    check: { data: null, card: null, loading: true },
};

const checkSlice = createSlice({
    name: 'check',
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
        }
    },
});

export const checkReducer = checkSlice.reducer;