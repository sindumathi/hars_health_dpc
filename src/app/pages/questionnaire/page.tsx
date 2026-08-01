"use client";
import { useState } from "react";
import { Pattern } from "@/src/components/uiComponents/Stepper";
import { useForm } from "@tanstack/react-form";
import { useRouter, redirect } from "next/navigation";
import { steps } from "@/src/data/steps";
import QuestionnaireNavigation from "./QuestionnaireNavigation";
import { useAppDispatch, useAppSelector } from "@/src/features/redux/hooks";
import {
  createPatientUserProfile,
  initialRegistrationState,
} from "@/src/features/redux/slice/resgistrationSlice";
import {
  createMedicalHistory,
  initialMedHistoryState,
} from "@/src/features/redux/slice/medicalHistorySlice";
import {
  createHealthQuestion,
  initialQuestionState,
} from "@/src/features/redux/slice/HealthQuestionsSlice";
import { useFormDefaultValues } from "./formHookDefaultValues";
import {
  PatientRegistrationState,
  MedicalHistoryState,
  HealthQuestionsState,
} from "@/src/features/types/patientRegistrationState.type";
import { QuestionnaireFormType } from "@/src/components/registration/data/formType";

// export const CreateForm = () =>
//   useForm({
//     defaultValues: {
//       personalDetails: {},
//       medicalHistory: {},
//       healthQuestions: {},
//     },
//   });

// export type QuestionnaireForm = ReturnType<typeof CreateForm>;
type QFormType = {
  personalDetails: object;
  medicalHistory: object;
  healthQuestions: object;
};
export default function Questionnaire() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    personalDetailsDefaultValue,
    medicalHistoryDefaultValue,
    questionDefaultValue,
    symptomsChecker,
  } = useFormDefaultValues();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(2);
  const totalSteps: number = steps.length;
  const formDefaultValue =
    currentStep === 2
      ? (personalDetailsDefaultValue as PatientRegistrationState)
      : currentStep === 3
        ? (medicalHistoryDefaultValue as MedicalHistoryState)
        : currentStep === 4
          ? (questionDefaultValue as HealthQuestionsState)
          : currentStep === 5
            ? symptomsChecker
            : {};

  const form = useForm({
    // defaultValues: { ...formDefaultValue },
    defaultValues: {
      personalDetails: {},
      medicalHistory: {},
      healthQuestions: {},
    },
    // onSubmit: async ({ value }) => {
    //   setIsSubmitting(true);
    //   try {
    //     console.log(value);
    //   } catch (err) {
    //     alert("Save failed");
    //   } finally {
    //     setIsSubmitting(false);
    //   }
    // },
  });

  const handlePrevious = () => {
    if (currentStep <= 1) return;
    setCurrentStep(currentStep - 1);
  };

  const fetchUserData = () => {};
  const handleFormSubmit = () => {
    console.log("final data", form.state.values);
    router.push("/pages/profile");
  };

  const handleSave = async () => {
    console.log("HANDLE SAVE");
    setIsSubmitting(true);

    try {
      console.log("final state", form.state.values);
      if (currentStep === 2) {
        const userData = form?.state?.values?.personalDetails;

        const finalData =
          form?.state?.values?.personalDetails || initialRegistrationState;
        console.log("finalData", finalData);
        await dispatch(createPatientUserProfile(finalData));
      } else if (currentStep === 3) {
        const finalData =
          form?.state?.values?.medicalHistory || initialMedHistoryState;
        await dispatch(createMedicalHistory(finalData));
      } else if (currentStep === 4) {
        const finalData =
          form?.state?.values?.healthQuestions || initialQuestionState;
        await dispatch(createHealthQuestion(finalData));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleNext = () => {
    if (currentStep === totalSteps) return;
    setCurrentStep(currentStep + 1);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div className="w-full flex items-center justify-center">
        <div className="mx-auto w-full max-w-6xl rounded-xl border bg-background p-8 shadow-sm">
          <Pattern stepForm={form} currentStep={currentStep} />
          <QuestionnaireNavigation
            totalSteps={totalSteps}
            handlePrevious={handlePrevious}
            handleSave={handleSave}
            handleNext={handleNext}
            isSubmitting={isSubmitting}
            handleFormSubmit={handleFormSubmit}
            currentStep={currentStep}
          />
        </div>
      </div>
    </form>
  );
}
