import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginState } from "../../types/auth.type";

const authInitialState: LoginState = {
  accessToken: null,
  userName: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "login",
  initialState: authInitialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<Partial<LoginState>>) => {
      Object.assign(state, action.payload);
    },
    clearAccessToken: (state) => {
      state.accessToken = null;
      state.userName = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAccessToken, clearAccessToken } = authSlice.actions;
export default authSlice.reducer;
