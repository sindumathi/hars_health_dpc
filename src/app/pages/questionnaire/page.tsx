"use client";
import { useState } from "react";
import { Pattern } from "@/src/components/uiComponents/Stepper";
import { useForm } from "@tanstack/react-form";
import { steps } from "@/src/data/steps";
import QuestionnaireNavigation from "./QuestionnaireNavigation";
import { useAppDispatch, useAppSelector } from "@/src/features/redux/hooks";
import { createPatientUserProfile } from "@/src/features/redux/slice/resgistrationSlice";

export default function Questionnaire() {
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => {
    console.log("STATE IN REDUCER:", state);
  });
  console.log("SELECTOR", selector);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(2);
  const totalSteps: number = steps.length;
  const form = useForm({
    defaultValues: {},
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      try {
        console.log(value);
      } catch (err) {
        alert("Save failed");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handlePrevious = () => {
    if (currentStep <= 1) return;
    setCurrentStep(currentStep - 1);
  };

  const handleSave = async () => {
    console.log("HANDLE SAVE");
    setIsSubmitting(true);

    try {
      console.log(form.state.values);
      await dispatch(createPatientUserProfile(form.state.values));
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
  );
}
