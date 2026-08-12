"use client";
import { useState } from "react";
import useReviewData from "./data/useReviewData";
import { FaUserAlt } from "react-icons/fa";
import DialogWindow from "../uiComponents/Dialog";
import { useForm, AnyFormApi } from "@tanstack/react-form";
import { useDispatch } from "react-redux";

import {
  createMedicalHistory,
  initialMedHistoryState,
} from "@/src/features/redux/slice/medicalHistorySlice";
import MedicalHistory from "./MedicalHistory";

export default function EditMedicalHistory() {
  const { medHistoryData } = useReviewData();
  const dispatch = useDispatch();
  const [editOpen, setEditOpen] = useState(false);
  const medHistoryDataLength = medHistoryData.length - 1;
  const form = useForm({
    defaultValues: {
      medicalHistory: {},
    },
  });
  const handleEdit = () => {
    setEditOpen(true);
  };
  const MedicalHistoryComponent = MedicalHistory as React.ComponentType<{
    form: AnyFormApi;
  }>;
  const handleSave = async () => {
    const userData = form?.state?.values?.medicalHistory;
    const finalData =
      form?.state?.values?.medicalHistory || initialMedHistoryState;
    console.log("finalData", finalData);
    await dispatch(createMedicalHistory(finalData));
    setEditOpen(false);
  };
  return (
    <>
      <div className="border border-gray-300 rounded-md mt-3">
        <div className=" flex bg-amber-100  justify-between">
          <div className="flex  gap-2 p-3 ">
            <FaUserAlt className=" text-sky-500" />
            <div className="text-md font-bold"> Medical History</div>
          </div>
          <div
            className="text-md text-blue-700 p-3 underline cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </div>
          {editOpen && (
            <DialogWindow
              open={editOpen}
              onOpenClose={setEditOpen}
              title="Personal Details"
              handleSave={handleSave}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  form.handleSubmit();
                }}
              >
                <MedicalHistoryComponent form={form} />
              </form>
            </DialogWindow>
          )}
        </div>
        <div>
          {medHistoryData.map((data, index) => {
            console.log(data.value);
            return (
              <div
                key={`${data.label}_${index}`}
                className={`flex flex-row gap-4  p-3 ${index !== medHistoryDataLength && " border-b-1 border-gray-300 "}`}
              >
                <div>{data.label}</div>
                <div className="flex">
                  {data?.value?.map((val, i) => {
                    const item = val as
                      | string
                      | { label: string }
                      | {
                          medName?: string;
                          medDosage?: string;
                          medFrequency?: string;
                        };

                    return (
                      <span
                        key={`history_${i}`}
                        className="bg-blue-100 mr-3 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        {typeof item === "string" ? (
                          item
                        ) : typeof item === "object" && "label" in item ? (
                          item?.label
                        ) : (
                          <div>
                            <span>{item?.medName}</span>
                            <span>{item?.medDosage}</span>
                            <span>{item?.medFrequency}</span>
                          </div>
                        )}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
