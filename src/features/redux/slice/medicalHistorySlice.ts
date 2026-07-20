import { createSlice } from "@reduxjs/toolkit";
import { MedicalHistoryState } from "@/src/features/types/patientRegistrationState.type";

const initialMedHistoryState: MedicalHistoryState = {
  existingConditions: [],
  allergies: [],
  medications: [],
};

const medicalHistorySlice = createSlice({
  name: "medHistory",
  initialState: initialMedHistoryState,
  reducers: {
    createMedicalHistory: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
});
export const { createMedicalHistory } = medicalHistorySlice.actions;
export default medicalHistorySlice.reducer;
