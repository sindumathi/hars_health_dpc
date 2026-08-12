//Medical History check box data----------------------------------------
import { ExistingConditionsData } from "@/src/features/types/patientRegistrationState.type";
import { nanoid } from "nanoid";
export const medicalHistoryData = [
  {
    id: "HTA1",
    conditionName: "Hypertension (high blood pressure)",
    category: "Cardiovascular",
    isChecked: false,
  },
  {
    id: "DIAMEL1",
    conditionName: "Type 1 Diabetes",
    category: "Endocrine",
    isChecked: false,
  },
  {
    id: "DIAMEL2",
    conditionName: "Type 2 Diabetes",
    category: "Endocrine",
    isChecked: false,
  },
  {
    id: "AST1",
    conditionName: "Asthma",
    category: "Respiratory",
    isChecked: false,
  },
  {
    id: "HEART1",
    conditionName: "Heart disease",
    category: "Cardiovascular",
    isChecked: false,
  },
  {
    id: "THYD1",
    conditionName: "Thyroid disorder",
    category: "Endocrine",
    isChecked: false,
  },
] as ExistingConditionsData[];
