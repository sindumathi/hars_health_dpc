import Button from "@/src/components/uiComponents/Button";
type NavProps = {
  currentStep: number;
  totalSteps: number;
  handlePrevious: () => void;
  handleSave: () => void;
  handleNext: () => void;
  isSubmitting?: boolean;
};
export default function QuestionnaireNavigation(props: NavProps) {
  const {
    currentStep,
    totalSteps,
    handlePrevious,
    handleSave,
    handleNext,
    isSubmitting,
  } = props;
  return (
    <div className="flex justify-between mt-8">
      <Button
        variant={currentStep == 2 ? "secondary" : "primary"}
        onClick={handlePrevious}
        disabled={currentStep == 2}
      >
        Back
      </Button>
      <div className="flex items-end gap-4">
        <Button
          variant={"primary"}
          onClick={handleSave}
          //disabled={currentStep == 2}
        >
          Save
        </Button>
        <Button
          variant={currentStep == totalSteps ? "secondary" : "primary"}
          onClick={handleNext}
          disabled={currentStep === totalSteps}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
