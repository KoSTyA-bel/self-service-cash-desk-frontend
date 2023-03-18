import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const getSelfCheckouts = createAsyncThunk(
    "getSelfCheckouts",
    async() => {
        const { data } = await axios.get("/api/SelfCheckout?page=1&pageSize=10");
        return data;
    }
);

export const takeSelfCheckout = createAsyncThunk(
    "takeSelfCheckout",
    async(selfCheckoutId) => {
        const { data } = await axios
            .put(`/api/SelfCheckout/Take/${selfCheckoutId}`)
            .then(({ data }) => {
                if (data !== undefined) {
                    localStorage.setItem("time", Number(Date.now()) + 1000 * 60 * 5);
                    localStorage.setItem("guid", JSON.stringify(data));
                    localStorage.setItem(
                        "selfCheckoutId",
                        JSON.stringify(selfCheckoutId)
                    );
                }

                return data;
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    return null;
                }
            });
    }
);

export const paySelfCheckout = createAsyncThunk(
    "paySelfCheckout",
    async(params) => {
        const { data } = await axios
            .post(`/api/SelfCheckout/Pay`, params)
            .then((x) => {
                localStorage.removeItem("products");
                localStorage.removeItem("guid");
                localStorage.removeItem("time");
                localStorage.removeItem("selfCheckoutId");
                return x;
            })
            .catch((error) => {
                if (error.response.status === 400 || error.response.status === 404) {
                    localStorage.removeItem("products");
                    localStorage.removeItem("guid");
                    localStorage.removeItemar("time");
                    localStorage.removeItem("selfCheckoutId");
                    window.location.href = "/";
                }
            });
        return data;
    }
);

export const freeSelfCheckout = createAsyncThunk(
    "freeSelfCheckout",
    async(params) => {
        localStorage.removeItem("products");
        localStorage.removeItem("guid");
        localStorage.removeItem("time");
        localStorage.removeItem("selfCheckoutId");

        const { data } = await axios
            .post(`/api/SelfCheckout/Free`, params)
            .then((x) => {
                return x;
            });
        return data;
    }
);

export const createSelfCheckout = createAsyncThunk(
    "createSelfCheckout",
    async(params) => {
        const { data } = await axios.post("/api/SelfCheckout", {
            isActive: params,
        });
        return data;
    }
);

export const freeFroUserSelfCheckout = createAsyncThunk(
    "freeFroUserSelfCheckout",
    async(params) => {
        const { data } = await axios.put(`/api/SelfCheckout/FreeForUser/${params}`);
        return data;
    }
);

export const updateSelfCheckout = createAsyncThunk(
    "updateSelfCheckout",
    async(params) => {
        const { data } = await axios.put(
            `/api/SelfCheckout/${params.id}`,
            params.data
        );
        return data;
    }
);

export const deleteSelfCheckout = createAsyncThunk(
    "deleteSelfCheckout",
    async(params) => {
        const { data } = await axios.delete(`/api/SelfCheckout/${params}`);
        return data;
    }
);

const initialState = {
    selfCheckouts: { items: [], loading: true },
    cartId: "",
    checkId: "",
    time: Date.now(),
};

const selfCheckoutSlice = createSlice({
    name: "selfCheckout",
    initialState,
    reducers: {
        updateTimer: (state) => {
            localStorage.setItem("time", Date.now());
            state.time = Number(localStorage.getItem("time", Date.now()));
        },
    },
    extraReducers: {
        [getSelfCheckouts.pending]: (state) => {
            state.selfCheckouts.loading = true;
            state.selfCheckouts.items = [];
        },
        [getSelfCheckouts.fulfilled]: (state, action) => {
            state.selfCheckouts.items = action.payload;
            state.selfCheckouts.loading = false;
        },
        [getSelfCheckouts.rejected]: (state) => {
            state.selfCheckouts.items = null;
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

export const { updateTimer } = selfCheckoutSlice.actions;

export const selfCheckoutReducer = selfCheckoutSlice.reducer;