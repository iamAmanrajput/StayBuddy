import { createSlice } from "@reduxjs/toolkit";

// Initial state with fallback values from localStorage
const initialState = {
  loading: false,
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
  currUser: localStorage.getItem("currUser")
    ? JSON.parse(localStorage.getItem("currUser"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setCurrUser(state, action) {
      state.currUser = action.payload; // Fix: Corrected the state key to currUser
    },
  },
});

export const { setLoading, setToken, setCurrUser } = authSlice.actions;

export default authSlice.reducer;
