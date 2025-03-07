import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  email: string | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isPasswordVisible: boolean;
  otp: string[];
}

const initialState: AuthState = {
  email: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  isPasswordVisible: false,
  otp: Array(6).fill(""),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<string>) => {
      state.email = action.payload || "";
      state.token = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    setOtp: (state, action: PayloadAction<string[]>) => {
      state.otp = action.payload;
    },
    clearAuth: (state) => {
      state.email = "";
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.otp = Array(6).fill("");
    },
    loading: (state) => {
      state.isLoading = true;
    },
    loadingStops: (state) => {
      state.isLoading = false;
    },
    togglePasswordVisibility: (state) => {
      state.isPasswordVisible = !state.isPasswordVisible;
    },
  },
});

export const {
  setAuth,
  clearAuth,
  setOtp,
  loading,
  loadingStops,
  togglePasswordVisibility,
} = authSlice.actions;

export default authSlice.reducer;
