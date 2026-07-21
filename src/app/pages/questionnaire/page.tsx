"use client";
import { useState } from "react";
import { Pattern } from "@/src/components/uiComponents/Stepper";
import { useForm } from "@tanstack/react-form";
import { steps } from "@/src/data/steps";
import QuestionnaireNavigation from "./QuestionnaireNavigation";
import { useAppDispatch, useAppSelector } from "@/src/features/redux/hooks";
import { createPatientUserProfile } from "@/src/features/redux/slice/resgistrationSlice";
import { createMedicalHistory } from "@/src/features/redux/slice/medicalHistorySlice";
import { useFormDefaultValues } from "./formHookDefaultValues";
import {
  PatientRegistrationState,
  MedicalHistoryState,
} from "@/src/features/types/patientRegistrationState.type";
export type questionnaireForm = ReturnType<typeof useForm>;
export default function Questionnaire() {
  const dispatch = useAppDispatch();
  const {
    personalDetailsDefaultValue,
    medicalHistoryDefaultValue,
    questionDefaultValue,
    symptomsChecker,
  } = useFormDefaultValues();
  console.log("personalDetailsDefaultValue", personalDetailsDefaultValue);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(4);
  const totalSteps: number = steps.length;
  const formDefaultValue =
    currentStep === 2
      ? (personalDetailsDefaultValue as PatientRegistrationState)
      : currentStep === 3
        ? (medicalHistoryDefaultValue as MedicalHistoryState)
        : currentStep === 4
          ? questionDefaultValue
          : currentStep === 5
            ? symptomsChecker
            : {};

  const form = useForm({
    defaultValues: { ...formDefaultValue },
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

  const handleSave = async () => {
    console.log("HANDLE SAVE");
    setIsSubmitting(true);

    try {
      console.log("final state", form.state.values);
      if (currentStep === 2) {
        await dispatch(createPatientUserProfile(form.state.values));
      } else if (currentStep === 3) {
        await dispatch(createMedicalHistory(form.state.values));
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
            currentStep={currentStep}
          />
        </div>
      </div>
    </form>
  );
}
