import { configureStore } from "@reduxjs/toolkit";
import registationReducer from "./slice/resgistrationSlice";
import medicalHistoryReducer from "./slice/medicalHistorySlice";
import healthQuestionReducer from "./slice/HealthQuestionsSlice";
import authReducer from "./slice/authSlice";
export const store = configureStore({
  reducer: {
    registration: registationReducer,
    medHistory: medicalHistoryReducer,
    healthQuestions: healthQuestionReducer,
    auth: authReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
