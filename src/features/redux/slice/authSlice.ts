import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginState } from "../../types/auth.type";

const authInitialState: loginState = { accessToken: null };

export const authSlice = createSlice({
  name: "login",
  initialState: authInitialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    clearAccessToken: (state) => {
      state.accessToken = null;
    },
  },
});

export const { setAccessToken, clearAccessToken } = authSlice.actions;
export default authSlice.reducer;
