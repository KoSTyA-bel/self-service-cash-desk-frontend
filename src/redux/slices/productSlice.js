import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const getProducts = createAsyncThunk('getProducts', async(requestData) => {
            console.log(requestData);
            const { data } = await axios.get(
                    `/api/Stock?page=${requestData.pageNumber}&pageSize=5${
      requestData.title ? `&name=${requestData.title}` : ''
    }${requestData.barcode ? `&barcode=${requestData.barcode}` : ''}`,
  );
  return data;
});

export const getProductsOnNextPage = createAsyncThunk('getProductsOnNextPage', async (requestData) => {
  const { data } = await axios.get(
    `/api/Stock?page=${requestData.pageNumber + 1}&pageSize=5${
      requestData.title ? `&name=${requestData.title}` : ''
    }${requestData.barcode ? `&barcode=${requestData.barcode}` : ''}`,
  );
  return data;
});

const initialState = {
  products: { items: [], loading: true },
  page: 1,
  isActive: true,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    nextPage: (state) => {
      state.page++;
    },
    prevPage: (state) => {
      if (state.page !== 1) {
        state.page--;
      }
    },
    toFirstPage: (state) => {
      state.page = 1;
    },
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
      state.products.loading = true;
      state.products.items = [];
      state.page = 1;
    },
    [getProductsOnNextPage.rejected]: (state) => {
      state.isActive = false;
    },
  },
});

export const { nextPage, prevPage, toFirstPage } = productSlice.actions;

export const productReducer = productSlice.reducer;