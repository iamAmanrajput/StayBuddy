import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listings: [],
  loading: false,
};

const listingsSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    addListings: (state, action) => {
      // Update state immutably (without using push)
      state.listings.push(action.payload);
    },
  },
});

export const { addListings, setLoading } = listingsSlice.actions;

export default listingsSlice.reducer;
