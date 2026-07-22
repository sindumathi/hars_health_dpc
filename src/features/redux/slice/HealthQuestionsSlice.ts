import { createSlice } from "@reduxjs/toolkit";
import { HealthQuestionsState } from "../../types/patientRegistrationState.type";

export const initialQuestionState: HealthQuestionsState = {
  questions: [],
  selfRating: null,
  healthChoices: [],
};

const healthQuestionSlice = createSlice({
  name: "healthQuestions",
  initialState: initialQuestionState,
  reducers: {
    createHealthQuestion: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { createHealthQuestion } = healthQuestionSlice.actions;
export default healthQuestionSlice.reducer;
