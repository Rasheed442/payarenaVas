import { createSlice } from "@reduxjs/toolkit";
import {
  validateProduct,
  processProduct,
} from "../../api/catalog/validateProduct";

let initialState = {
  validateData: null,
  processData: null,
  formData: null,
  error: null,
  error2: null,
  loading: false,
};

export const validateProductSlice = createSlice({
  name: "validate",
  initialState,
  reducers: {
    clearState: () => {
      initialState = {
        validateData: null,
        processData: null,
        formData: null,
        error: null,
        error2: null,
        loading: false,
      };
    },
    updateFormData: (state, action) => {
      state.formData = action.payload;
    },
    goBackToStep1: (state, { payload }) => {
      state.validateData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(validateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(validateProduct.fulfilled, (state, action) => {
        state.validateData = action.payload;
        state.loading = false;
      })
      .addCase(validateProduct.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
    builder
      .addCase(processProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(processProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.processData = action.payload;
        state.validateData = null;
      })
      .addCase(processProduct.rejected, (state, action) => {
        state.loading = false;
        state.error2 = action.payload;
      });
  },
});

export const validateActions = validateProductSlice.actions;
export const validateSelector = (state) => state.validate;
