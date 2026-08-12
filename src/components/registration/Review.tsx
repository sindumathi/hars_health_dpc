"use client";
import useReviewData from "./data/useReviewData";
import { FaUserAlt } from "react-icons/fa";
import UserProfile from "./UserProfile";
import EditMedicalHistory from "./EditMedHistory";
export default function Review() {
  const { personalData, medHistoryData } = useReviewData();
  const personalDataLength = personalData.length - 1;
  const medHistoryDataLength = medHistoryData.length - 1;

  return (
    <>
      <UserProfile />
      <EditMedicalHistory />
    </>
  );
}
