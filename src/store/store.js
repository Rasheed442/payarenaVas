import { configureStore } from "@reduxjs/toolkit";
import { catalogSlice } from "./services/catalog/catalog.service";
import { validateProductSlice } from "./services/catalog/validate.service";
import { loginSlice } from "./services/auth/login";
import { receiptSlice } from "./services/catalog/receipt.service";

export const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    catalogs: catalogSlice.reducer,
    validate: validateProductSlice.reducer,
    receipt: receiptSlice.reducer,
  },
});
