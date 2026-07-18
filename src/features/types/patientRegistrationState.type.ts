import { ReactNode } from "react";
export interface EmergencyContactInfoProps {
  emergencyContactName?: string;
  relationship?: string;
  contactNumber?: string;
}

export interface PatientRegistrationState {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  patientId: string;
  phoneNumber: string;
  department: string;
  emergencyContact: EmergencyContactInfoProps;
}

export interface RegistrationStepProps {
  id: number;
  title: string;
  status: "completed" | "active" | "inactive";
  formId: string;
  component: ReactNode | null;
}
