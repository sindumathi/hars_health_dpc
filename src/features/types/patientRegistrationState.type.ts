import { ReactNode } from "react";
import { ComponentType } from "react";

// step : Patient information type-------------------------------
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
  component: ReactNode | ComponentType<never> | null;
}

// step 2: Medical conditions type--------------------------------
export type ExistingConditionsData = {
  id: string;
  conditionName: string;
  category: string;
  isChecked: boolean;
};

export type MedicationsData = {
  medName: string;
  medDosage: string;
  medFrequency: string;
};
export interface MedicalHistoryState {
  existingConditions: ExistingConditionsData[];
  allergies: string[];
  medications: MedicationsData[];
}

//step3: Health Questions type------------------------------------
export interface QuestionsState {
  questionId: number;
  type: "radio" | "text";
  answerId?: string;
  answerText?: string;
}

export interface DailyChoiceState {
  id: number;
  choiceName: string;
}

export interface HealthQuestionsState {
  questions: QuestionsState[];
  selfRating: number;
  healthChoices: DailyChoiceState[];
}
