import Button from "@/src/components/uiComponents/Button";
type saveStatusType = {
  message?: string;
  error?: string;
};
type NavProps = {
  currentStep: number;
  totalSteps: number;
  handlePrevious: () => void;
  handleSave: () => void;
  handleNext: () => void;
  handleFormSubmit: () => void;
  saveStatus?: saveStatusType;
  isSubmitting?: boolean;
};
export default function QuestionnaireNavigation(props: NavProps) {
  const {
    currentStep,
    totalSteps,
    handlePrevious,
    handleSave,
    handleNext,
    handleFormSubmit,
    saveStatus,
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
        {currentStep === totalSteps ? (
          <Button variant="primary" onClick={handleFormSubmit}>
            Submit
          </Button>
        ) : (
          <>
            {saveStatus && (
              <div
                className={`text-xs whitespace-pre-line ${saveStatus?.error ? "text-red-500" : "text-green-500"}`}
              >
                {saveStatus.error || saveStatus.message}
              </div>
            )}
            <Button
              variant={"primary"}
              onClick={handleSave}
              //disabled={currentStep == 2}
            >
              Save
            </Button>
          </>
        )}
        <Button
          variant={currentStep === totalSteps ? "secondary" : "primary"}
          onClick={handleNext}
          disabled={currentStep === totalSteps}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
