"use client";
import { useSelector } from "react-redux";
import { PatientRegistrationState } from "@/src/features/types/patientRegistrationState.type";

export default function useReviewData() {
  const registration = useSelector((state) => state?.registration);
  const medHistory = useSelector((state) => state?.medHistory);
  const healthQuestions = useSelector((state) => state?.healthQuestions);
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
      value: registration?.emergencyContact[0]?.emergencyContactName,
    },
    {
      label: "Emergency Contact Number",
      value: registration?.emergencyContact[0]?.contactNumber,
    },
  ];
  const medHistoryData = [
    { label: "Conditions", value: medHistory?.existingConditions },
    { label: "Allergies", value: medHistory?.allergies || [] },
    { label: "Medications", value: medHistory.medications || [] },
  ];

  return { personalData, medHistoryData };
}
