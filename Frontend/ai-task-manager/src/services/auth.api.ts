import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    payload: RegisterPayload,
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        payload
      );
      return res.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(
          err.response?.data || "Registration failed"
        );
      }
      return rejectWithValue("Unexpected error occurred");
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        credentials
      );
      return res.data; // { id, name, email, token }
    } catch (err: unknown) {
  if (axios.isAxiosError(err)) {
    return rejectWithValue(
      err.response?.data || "Login failed"
    );
  }

  return rejectWithValue("Unexpected error occurred");
}
  }
);
