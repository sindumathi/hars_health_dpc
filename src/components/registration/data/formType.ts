import { initialRegistrationState } from "@/src/features/redux/slice/resgistrationSlice";
import { initialMedHistoryState } from "@/src/features/redux/slice/medicalHistorySlice";
import { initialQuestionState } from "@/src/features/redux/slice/HealthQuestionsSlice";
import { ReactFormApi } from "@tanstack/react-form";
import { useForm } from "@tanstack/react-form";
import { ReactNode } from "react";
import MedicalHistory from "../MedicalHistory";
import PersonalDetails from "../PersonalDetails";

export const RegistrationForm = () =>
  useForm({
    defaultValues: initialRegistrationState,
  });
const MEDICATION_FIELD = { medName: "", medDosage: "", medFrequency: "" };
const medicalFormFieldState = {
  medicalHistory: initialMedHistoryState,
  medications: [MEDICATION_FIELD],
};
export const MedicalHistoryForm = () =>
  useForm({
    defaultValues: medicalFormFieldState,
  });

const questionsArray = [
  { type: "", questionId: 0, answerId: "0" },
  { type: undefined, questionId: 0, answerId: "0" },
];
const QuestionFormFieldType = {
  healthQuestions: {
    questions: questionsArray,
    selfRating: null,
    healthChoices: [""],
  },
};

const QuestionnaireFieldType = {
  PersonalDetails: {},
  medicalHistory: {},
  healthQuestions: {},
};

export const QuestionnaireForm = () => {
  useForm({ defaultValues: {} });
};
export const HealthQuestionForm = () =>
  useForm({
    defaultValues: {},
  });
export type NoChildrenField = {
  label: string;
};

export type ChildrenField = {
  label: string;
  children: ReactNode;
};
export type QuestionnaireFormType = ReturnType<typeof QuestionnaireForm>;
export type RegistrationFormType = ReturnType<typeof RegistrationForm>;
export type HistoryFormType = ReturnType<typeof MedicalHistoryForm>;
export type QuestionFormType = ReturnType<typeof HealthQuestionForm>;
