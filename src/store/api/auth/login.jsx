import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";

export const loginUser = createAsyncThunk(
  "/account/login",
  async ({ email: username, password }, thunkAPI) => {
    const formData = new FormData();
    try {
      formData.append("username", username);
      formData.append("password", password);
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}account/login`,
        {
          method: "POST",
          body: formData,
          redirect: "follow",
        }
      );
      let data = await response.json();

      if (data?.Success !== true) {
        toast.error(data?.Message || "Login failed! Please try again.");
        return thunkAPI.rejectWithValue(data);
      }
      // if (data?.Success === true) {
      //   sessionStorage.setItem(
      //     "token",
      //     JSON.stringify(data?.Data?.access_token)
      //   );
      //   sessionStorage.setItem(
      //     "userDetails",
      //     JSON.stringify(data?.Data?.userProfile)
      //   );
      //   window.location.href = "/dashboard";
      //   return data?.Data?.access_token;
      // } else {
      //   toast.error(data?.message);
      //   return thunkAPI.rejectWithValue(data);
      // }
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue([
        {
          message: "Failed to establish connection!",
        },
      ]);
    }
  }
);
