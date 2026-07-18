import { createSlice } from "@reduxjs/toolkit";
import { PatientRegistrationState } from "../../types/patientRegistrationState.type";

const initialRegistrationState: PatientRegistrationState = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  patientId: "",
  phoneNumber: "",
  department: "",
  emergencyContact: {},
};

const registrationSlice = createSlice({
  name: "registration",
  initialState: initialRegistrationState,
  reducers: {
    createPatientUserProfile: (state, action) => {
      console.log("STATE", state);
      console.log("PAYLOAD", action);
      Object.assign(state, action.payload);
    },
  },
});

export const { createPatientUserProfile } = registrationSlice.actions;
export default registrationSlice.reducer;
