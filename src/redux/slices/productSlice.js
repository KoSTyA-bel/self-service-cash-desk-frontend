import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import axios from "../../axios";

export const getProducts = createAsyncThunk(
  "getProducts",
  async (requestData) => {
    console.log(requestData);
    const { data } = await axios.get(
      `/api/Stock?page=${requestData.pageNumber}&pageSize=5${
        requestData.title ? `&name=${requestData.title}` : ""
      }${requestData.barcode ? `&barcode=${requestData.barcode}` : ""}`
    );
    return data;
  }
);

export const getProductsOnNextPage = createAsyncThunk(
  "getProductsOnNextPage",
  async (requestData) => {
    const { data } = await axios.get(
      `/api/Stock?page=${requestData.pageNumber + 1}&pageSize=5${
        requestData.title ? `&name=${requestData.title}` : ""
      }${requestData.barcode ? `&barcode=${requestData.barcode}` : ""}`
    );
    return data;
  }
);

export const createProduct = createAsyncThunk(
  "createProduct",
  async (params) => {
    var token = "Bearer " + localStorage.getItem("jwt");
    const data = await axios
      .post("/api/Product", params, {
        headers: {
          authorization: token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });

    return data;
  }
);

export const updateProduct = createAsyncThunk(
  "updateProduct",
  async (params) => {
    var token = "Bearer " + localStorage.getItem("jwt");
    const { data } = await axios.put(`/api/Product/${params.id}`, params.data, {
      headers: {
        authorization: token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return data;
  }
);

export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (params) => {
    var token = "Bearer " + localStorage.getItem("jwt");
    const { data } = await axios.delete(`/api/Product/${params}`, {
      headers: {
        authorization: token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return data;
  }
);

export const deleteStock = createAsyncThunk("deleteStock", async (params) => {
  var token = "Bearer " + localStorage.getItem("jwt");
  const { data } = await axios.delete(`/api/Stock/${params}`, {
    headers: {
      authorization: token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return data;
});

export const createStock = createAsyncThunk("createStock", async (params) => {
  console.log(params);
  var token = "Bearer " + localStorage.getItem("jwt");
  const { data } = await axios.post("/api/Stock", params, {
    headers: {
      authorization: token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return data;
});

export const updateStock = createAsyncThunk("updateStock", async (params) => {
  console.log(params);
  var token = "Bearer " + localStorage.getItem("jwt");
  const { data } = await axios.put(`/api/Stock/${params.id}`, params.data, {
    headers: {
      authorization: token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return data;
});

const initialState = {
  products: { items: [], loading: true },
  createdProductId: 0,
  stock: null,
  page: 1,
  isActive: true,
};

const productSlice = createSlice({
  name: "products",
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
    writeStock: (state, action) => {
      state.stock = action.payload;
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
      state.products.loading = false;
      state.products.items = [];
      state.page = 1;
    },
    [createProduct.fulfilled]: (state, action) => {
      state.createdProductId = action.payload;
    },
    [getProductsOnNextPage.rejected]: (state) => {
      state.isActive = false;
    },
    [getProductsOnNextPage.fulfilled]: (state, action) => {
      if (action.payload === undefined) {
        state.isActive = false;
      } else {
        state.isActive = true;
      }
    },
  },
});

export const { nextPage, prevPage, toFirstPage, writeStock } =
  productSlice.actions;

export const productReducer = productSlice.reducer;
