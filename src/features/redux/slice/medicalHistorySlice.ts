import { createSlice } from "@reduxjs/toolkit";
import {
  MedicalHistoryState,
  MedicationsDataType,
} from "@/src/features/types/patientRegistrationState.type";

export const initialMedHistoryState: MedicalHistoryState = {
  existingConditions: [],
  allergies: [],
  medications: [{ medName: "", medDosage: "", medFrequency: "" }],
};

const medicalHistorySlice = createSlice({
  name: "medHistory",
  initialState: initialMedHistoryState,
  //initialState: initialData,
  reducers: {
    createMedicalHistory: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
});
export const { createMedicalHistory } = medicalHistorySlice.actions;
export default medicalHistorySlice.reducer;
