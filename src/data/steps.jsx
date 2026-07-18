import HealthQuestions from "@/src/components/registration/HealthQuestions";
import MedicalHistory from "@/src/components/registration/MedicalHistory";
import PersonalDetails from "@/src/components/registration/PersonalDetails";
import Review from "@/src/components/registration/Review";
import SymptomsChecker from "@/src/components/registration/SymptomsChecker";

export const steps = [
  {
    id: 1,
    title: "Consent",
    status: "completed",
    formId: "consent",
    component: null,
  },
  {
    id: 2,
    title: "Personal",
    status: "active",
    formId: "registrationForm",
    component: PersonalDetails,
  },
  {
    id: 3,
    title: "Medical",
    status: "inactive",
    formId: "medHistoryForm",
    component: MedicalHistory,
  },
  {
    id: 4,
    title: "Questions",
    status: "inactive",
    formId: "healthQuestions",
    component: HealthQuestions,
  },
  {
    id: 5,
    title: "Symptoms",
    status: "inactive",
    formId: "symptoms",
    component: SymptomsChecker,
  },
  {
    id: 6,
    title: "Review",
    status: "inactive",
    formId: "review",
    component: Review,
  },
];
