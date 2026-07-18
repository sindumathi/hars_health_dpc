"use client";
import { medicalHistoryData } from "@/src/data/checkBoxData";
import { useForm } from "@tanstack/react-form";

interface MedicalHistoryData {
  id: number;
  displayText: string;
  category: string;
}
export default function MedicalHistory() {
  const { Field } = useForm({
    defaultValues: {},
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });
  const displayMedicalHistory = (hData: MedicalHistoryData) => {
    return <></>;
  };
  return (
    <div className="mx-auto p-8">
      <h1 className="sub-header-text">Medical History</h1>
      <p className="text-gray-400 text-sm">
        Tick any conditions that apply. This helps your care team prepare.
      </p>
      <h1 className="sub-header-text">Existing conditions</h1>
      {medicalHistoryData.map((hData) => displayMedicalHistory(hData))}
    </div>
  );
}
