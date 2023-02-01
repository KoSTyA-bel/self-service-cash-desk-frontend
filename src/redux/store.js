import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './slices/cartSlice';
import { selfCheckoutReducer } from './slices/selfCheckoutSlice';
import { productReducer } from './slices/productSlice';
import { checkReducer } from './slices/checkSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        selfCheckouts: selfCheckoutReducer,
        products: productReducer,
        check: checkReducer
    },
});

export default store;