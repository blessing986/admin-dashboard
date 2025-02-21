import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    clearAuth: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    loading: (state) => {
      state.isLoading = true; 
    },
    loadingStops: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setAuth, clearAuth, loading, loadingStops } = authSlice.actions;

export default authSlice.reducer;
