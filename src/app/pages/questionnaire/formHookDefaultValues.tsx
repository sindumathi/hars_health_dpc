import { useAppSelector } from "@/src/features/redux/hooks";

export const useFormDefaultValues = () => {
  const userData = useAppSelector((state) => state.registration);
  const personalDetailsDefaultValue = {
    firstName: userData.firstName || "",
    lastName: userData.lastName || "",
    dateOfBirth: userData.dateOfBirth || "",
    gender: userData.gender || "",
    patientId: userData.patientId || "",
    phoneNumber: userData.dateOfBirth || "",
    emergencyContact: userData.emergencyContact || [],
  };

  const medicalHistoryDefaultValue = {
    existingConditions: [],
    allergies: [],
    medications: [],
  };

  const questionDefaultValue = {
    questionId: "",
    selectedOption: [],
  };

  const symptomsChecker = {
    bodyPart: "",
    painSeverity: "",
    painDuration: "",
    symptoms: "",
  };
  return {
    personalDetailsDefaultValue,
    medicalHistoryDefaultValue,
    questionDefaultValue,
    symptomsChecker,
  };
};
