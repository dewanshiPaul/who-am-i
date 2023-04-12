import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import detailsSlice from "./detailsSlice";

export const store = configureStore({
    reducer: {
        authSlice: authSlice.reducer,
        detailsSlice: detailsSlice.reducer,
    },
});