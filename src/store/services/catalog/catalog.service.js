import { createSlice, createAction } from "@reduxjs/toolkit";
import { getCatalog } from "../../api/catalog/getCatalog";

const GET_CATALOG = createAction("getcatalog");

let initialState = {
  data: [],
  editedCatalog: [],
  error: null,
  loading: false,
  billerData: null,
  selectedBiller: "",
  billerIsLink: false,
  selectedPayment: "Airtime Recharge",
};

export const catalogSlice = createSlice({
  name: "catalogs",
  initialState,
  reducers: {
    clearState: () => {
      initialState = {
        data: [],
        loading: false,
        selectedBiller: "",
      };
    },
    resetBillerData: (state) => {
      state.selectedBiller = "";
      return state;
    },
    toggleBillerisLink: (state, { payload }) => {
      state.billerIsLink = payload;
      return state;
    },
    setBiller: (state, { payload }) => {
      state.billerData = payload;
      return state;
    },
    setEditedData: (state, { payload }) => {
      state.editedCatalog = payload;
      return state;
    },
    setSelectedBiller: (state, { payload }) => {
      state.selectedBiller = payload;
      return state;
    },
    setSelectedPayment: (state, { payload }) => {
      state.selectedPayment = payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCatalog.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCatalog.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getCatalog.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const catalogActions = catalogSlice.actions;
export const catalogSelector = (state) => state.catalogs;
