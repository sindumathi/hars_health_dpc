"use client";
import { useState } from "react";
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

type StepperProps = {
  currentStep: number;
  stepForm: any;
};
export function Pattern(props: StepperProps) {
  const { currentStep, stepForm } = props;
  console.log("currentStep", currentStep);
  const StepComponent = steps[currentStep - 1].component;
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
