import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./slices/cartSlice";
import { selfCheckoutReducer } from "./slices/selfCheckoutSlice";
import { productReducer } from "./slices/productSlice";
import { checkReducer } from "./slices/checkSlice";
import { authReducer } from "./slices/authSlice";
import { cardReducer } from "./slices/cardSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    selfCheckouts: selfCheckoutReducer,
    products: productReducer,
    check: checkReducer,
    auth: authReducer,
    cards: cardReducer,
  },
});

export default store;
