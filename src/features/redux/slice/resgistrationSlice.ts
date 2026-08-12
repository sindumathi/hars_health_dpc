import { createSlice } from "@reduxjs/toolkit";
import { PatientRegistrationState } from "../../types/patientRegistrationState.type";

const emContact = {
  emergencyContactName: "",
  relationship: "",
  contactNumber: "",
};

export const initialRegistrationState: PatientRegistrationState = {
  firstName: " ",
  lastName: " ",
  dateOfBirth: "",
  gender: "",
  patientId: "",
  phoneNumber: "",
  emergencyContact: emContact,
};
const registrationSlice = createSlice({
  name: "registration",
  initialState: initialRegistrationState,
  //initialState: initialData,
  reducers: {
    createPatientUserProfile: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { createPatientUserProfile } = registrationSlice.actions;
export default registrationSlice.reducer;
