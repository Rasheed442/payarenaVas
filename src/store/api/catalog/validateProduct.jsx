import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";

let newPayload = {};

// const accessToken = localStorage.getItem("token")
export const validateProduct = createAsyncThunk(
  "/transaction/validate",
  async (payload, thunkAPI) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}transaction/validate`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            // Authorization: "No Auth",
          },
          body: JSON.stringify(payload),
        }
      );
      let data = await response.json();

      // Check if data contains the new Amount value
      if (data?.Data && Array.isArray(data.Data)) {
        // Find the object with Key "Amount" in data.Data
        const newAmountObj = data.Data.find((obj) => obj.Key === "Amount");
        if (newAmountObj) {
          // Overwrite the Amount value in the payload with the new value
          newPayload = {
            ...payload,
            Amount: newAmountObj.Value,
          };
        }
      }

      if (data?.Success === false || data?.Error) {
        toast.error("Error", {
          description:
            data?.Error ||
            data?.Message ||
            "Couldn't process payment, please try again.",
          duration: 5000,
          className: "testClass",
          style: { background: "#ff910a" },
        });
      }
      // console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue([
        {
          message: "Failed to establish connection!",
        },
      ]);
    }
  }
);

export const processProduct = createAsyncThunk(
  "/transaction/process",
  async (payload, thunkAPI) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}transaction/process`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            // Authorization: "No Auth",
          },
          body: JSON.stringify(payload),
        }
      );
      let data = await response.json();
      if (response.status === 200 && data?.Success === true) {
        window.location.href = `${data?.Data?.Url}`;
      } else {
        toast.error("Error", {
          description:
            data?.Error ||
            data?.Message ||
            "Couldn't process payment, please try again.",
          duration: 5000,
          className: "testClass",
          style: { background: "#ff910a" },
        });
      }

      return data;
      //   console.log(data);
    } catch (error) {
      //   console.log(error);
      return thunkAPI.rejectWithValue([
        {
          message: "Failed to establish connection!",
        },
      ]);
    }
  }
);
