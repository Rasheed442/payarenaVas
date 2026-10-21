import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";

export const getReceipt = createAsyncThunk(
  "/transaction/receipt",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }transaction/TransactionReport/${payload}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "No Auth",
          },
        }
      );
      let data = await response.json();
      console.log(data);

      if (data?.Success === false || data?.Error) {
        toast.error("Error", {
          description:
            data?.Error ||
            data?.Message ||
            "Couldn't process payment, please try again.",
          duration: 5000,
          className: "testClass",
        });
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  }
);
