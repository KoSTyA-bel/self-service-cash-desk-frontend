import { createSlice } from '@reduxjs/toolkit';

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const getCheck = createAsyncThunk('getCheck', async(number) => {
    console.log("GETTTTT")
    const { data } = await axios.get(`/api/Check/${number}`);
    return data;
});

const initialState = {
    check: { data: null, loading: true },
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
        }
    },
});

export const checkReducer = checkSlice.reducer;