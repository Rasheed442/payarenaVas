import { createSlice, createAction } from "@reduxjs/toolkit";
import { getReceipt } from "../../api/catalog/receipt";

export const receiptSlice = createSlice({
  name: "receipt",
  initialState: {
    data: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReceipt.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReceipt.fulfilled, (state, { payload }) => {
        state.data = payload;
        state.loading = false;
      })
      .addCase(getReceipt.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const receiptActions = receiptSlice.actions;
export const receiptSelector = (state) => state.receipt;
