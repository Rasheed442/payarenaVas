import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";

export const getCatalog = createAsyncThunk(
  "/all",
  async (countryCode, thunkAPI) => {
    try {
      let code = "";
      if (typeof countryCode === "object") {
        code = countryCode.countryCode;
      } else {
        code = countryCode;
      }
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}all?countryCode=${code}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "No Auth",
          },
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        sessionStorage.setItem("catalogs", JSON.stringify(data));
        return data;
      } else {
        toast.error("Error", {
          description: data?.Error || "Couldn't get catalog, please try again.",
          duration: 5000,
          style: { background: "#ff910a" },
        });
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      toast.error("Network error. Please try again.");
      return thunkAPI.rejectWithValue([
        {
          message: "Failed to establish connection!",
        },
      ]);
    }
  }
);
