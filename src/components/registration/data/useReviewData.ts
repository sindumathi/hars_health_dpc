"use client";
import { useAppSelector } from "@/src/features/redux/hooks";
import { PatientRegistrationState } from "@/src/features/types/patientRegistrationState.type";

export default function useReviewData() {
  const registration = useAppSelector((state) => state?.registration);
  const medHistory = useAppSelector((state) => state?.medHistory);
  const healthQuestions = useAppSelector((state) => state?.healthQuestions);
  console.log("registration", registration);
  console.log("medhistory", medHistory);
  const personalData = [
    { label: "Patient Id", value: registration?.patientId },
    { label: "First Name", value: registration?.firstName },
    { label: "Last Name", value: registration?.lastName },
    { label: "Date of birth", value: registration?.dateOfBirth },
    { label: "Gender", value: registration?.gender },
    { label: "Phone number", value: registration?.phoneNumber },
    { label: "Gender", value: registration?.gender },
    {
      label: "Emergency Contact Name",
      value: registration?.emergencyContact?.emergencyContactName,
    },
    {
      label: "Emergency Contact Number",
      value: registration?.emergencyContact?.contactNumber,
    },
  ];
  const medHistoryData = [
    { label: "Conditions", value: medHistory?.existingConditions },
    { label: "Allergies", value: medHistory?.allergies || [] },
    { label: "Medications", value: medHistory.medications || [] },
  ];

  return { personalData, medHistoryData };
}
