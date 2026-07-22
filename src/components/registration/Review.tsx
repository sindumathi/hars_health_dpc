"use client";
import useReviewData from "./data/useReviewData";
import { FaUserAlt } from "react-icons/fa";
export default function Review() {
  const { personalData, medHistoryData } = useReviewData();
  const personalDataLength = personalData.length - 1;
  const medHistoryDataLength = medHistoryData.length - 1;

  return (
    <>
      <div className="border border-gray-300 rounded-md mt-3">
        <div className=" flex bg-amber-100  justify-between">
          <div className="flex  gap-2 p-3 ">
            <FaUserAlt className=" text-sky-500" />
            <div className="text-md font-bold">Personal Details</div>
          </div>
          <div className="text-md text-blue-700 p-3 underline">Edit</div>
        </div>
        <div>
          {personalData.map((data, index) => {
            return (
              <div
                key={`${data.label}_${index}`}
                className={`flex justify-between p-3 ${index !== personalDataLength && " border-b-1 border-gray-300 "}`}
              >
                <div>{data.label}</div>
                <div>{data.value}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="border border-gray-300 rounded-md mt-3">
        <div className=" flex bg-amber-100  justify-between">
          <div className="flex  gap-2 p-3 ">
            <FaUserAlt className=" text-sky-500" />
            <div className="text-md font-bold">Medical History</div>
          </div>
          <div className="text-md text-blue-700 p-3 underline">Edit</div>
        </div>
        <div>
          {medHistoryData.map((data, index) => {
            return (
              <div
                key={`${data.label}_${index}`}
                className={`flex justify-between p-3 ${index !== medHistoryDataLength && " border-b-1 border-gray-300 "}`}
              >
                <div>{data.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
