import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import listingsReducer from "./slices/listingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer, // Make sure the reducer is added to the store
    listing: listingsReducer,
  },
});
