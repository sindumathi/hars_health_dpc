import { configureStore } from "@reduxjs/toolkit";
import registationReducer from "./slice/resgistrationSlice";
import medicalHistoryReducer from "./slice/medicalHistorySlice";
export const store = configureStore({
  reducer: {
    registration: registationReducer,
    medHistory: medicalHistoryReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
