const PersonalDetailsDefaultValue = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  patientId: "",
  phoneNumber: "",
  emergencyContact: [],
};

const MedicalHistoryDefaultValue = {
  existingConditions: [],
  allergies: [],
  medications: [],
};

const QuestionDefaultValue = {
  questionId: "",
  selectedOption: [],
};

const SymptomsChecker = {
  bodyPart: "",
  painSeverity: "",
  painDuration: "",
  symptoms: "",
};
export * from "./formHookDefaultValues";
