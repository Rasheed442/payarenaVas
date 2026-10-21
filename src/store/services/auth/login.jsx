import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../../api/auth/login";

let initialState = {
  userData: null,
  authenticating: false,
  authenticated: false,
  errors: null,
};
export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    clearState: () => ({
  userData: null,
  authenticating: false,
  authenticated: false,
  errors: null,
}),

  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.authenticating = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.userData = payload;
      state.authenticated = true;
      state.authenticating = false;
      return state;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.errors = payload.errors || payload;
      state.authenticated = false;
      state.authenticating = false;
      return state;
    },
  },
});

export const loginSelector = (state) => state.login;
export const { clearState } = loginSlice.actions;
