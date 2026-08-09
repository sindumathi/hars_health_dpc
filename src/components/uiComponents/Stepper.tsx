"use client";
import { useState, ComponentType } from "react";
import {
  Stepper,
  StepperContent,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/src/components/reui/stepper";
import { CheckIcon, LoaderCircleIcon } from "lucide-react";
import { steps } from "@/src/data/steps";
import {
  RegistrationFormType,
  QuestionFormType,
  HistoryFormType,
  QuestionnaireFormType,
} from "../registration/data/formType";
import {
  MedicalHistoryState,
  RegistrationStepProps,
} from "../../features/types/patientRegistrationState.type";
import { AnyFormApi } from "@tanstack/react-form";
type StepperProps = {
  stepForm: AnyFormApi;
  currentStep: number;
};

export function Pattern(props: StepperProps) {
  const { currentStep, stepForm } = props;
  // console.log("currentStep", currentStep);
  const step = steps[currentStep - 1];
  const StepComponent = step.component as React.ComponentType<{
    form: AnyFormApi;
  }>;
  // currentStep === 2
  //   ? (step.component as React.ComponentType<{ form: RegistrationFormType }>)
  //   : currentStep === 3
  //     ? (step.component as React.ComponentType<{ form: MedicalHistoryState }>)
  //     : currentStep === 4
  //       ? (step.component as React.ComponentType<{
  //           form: QuestionFormType;
  //         }>)
  //       : null;

  return (
    <div className="mx-auto w-full">
      <Stepper
        value={currentStep}
        indicators={{
          completed: <CheckIcon className="size-3.5" />,
          loading: <LoaderCircleIcon className="size-3.5 animate-spin" />,
        }}
        className="w-full space- y-8"
      >
        <StepperNav>
          {steps.map((step, index) => (
            <StepperItem
              key={step.id}
              step={step.id}
              className="relative flex-1 items-start"
            >
              <StepperTrigger className="flex flex-col gap-2.5">
                <StepperIndicator>{index + 1}</StepperIndicator>
                <StepperTitle>{step.title}</StepperTitle>
              </StepperTrigger>

              {steps.length > index + 1 && (
                <StepperSeparator className="group-data-[state=completed]/step:bg-primary absolute inset-x-0 top-2.5 left-[calc(50%+0.875rem)] m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2rem+0.225rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none" />
              )}
            </StepperItem>
          ))}
        </StepperNav>

        <StepperPanel className="text-sm">
          <StepperContent value={currentStep}>
            <StepComponent form={stepForm} />
          </StepperContent>
        </StepperPanel>
      </Stepper>
    </div>
  );
}
