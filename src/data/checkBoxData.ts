//Medical History check box data----------------------------------------
import { ExistingConditionsData } from "@/src/features/types/patientRegistrationState.type";
import { nanoid } from "nanoid";
export const medicalHistoryData = [
  {
    id: nanoid(),
    conditionName: "Hypertension (high blood pressure)",
    category: "Cardiovascular",
    isChecked: false,
  },
  {
    id: nanoid(),
    conditionName: "Type 1 Diabetes",
    category: "Endocrine",
    isChecked: false,
  },
  {
    id: nanoid(),
    conditionName: "Type 2 Diabetes",
    category: "Endocrine",
    isChecked: false,
  },
  {
    id: nanoid(),
    conditionName: "Asthma",
    category: "Respiratory",
    isChecked: false,
  },
  {
    id: nanoid(),
    conditionName: "Heart disease",
    category: "Cardiovascular",
    isChecked: false,
  },
  {
    id: nanoid(),
    conditionName: "Thyroid disorder",
    category: "Endocrine",
    isChecked: false,
  },
] as ExistingConditionsData[];
