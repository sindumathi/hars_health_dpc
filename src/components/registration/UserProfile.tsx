"use client";
import { useState } from "react";
import useReviewData from "./data/useReviewData";
import { FaUserAlt } from "react-icons/fa";
import PersonalDetails from "./PersonalDetails";
import DialogWindow from "../uiComponents/Dialog";
import { useForm, AnyFormApi } from "@tanstack/react-form";
import { useDispatch } from "react-redux";
import { createPatientUserProfile } from "@/src/features/redux/slice/resgistrationSlice";
import { initialRegistrationState } from "@/src/features/redux/slice/resgistrationSlice";

export default function UserProfile() {
  const { personalData } = useReviewData();
  const dispatch = useDispatch();
  const [editOpen, setEditOpen] = useState(false);
  const personalDataLength = personalData.length - 1;
  const form = useForm({
    defaultValues: {
      personalDetails: {},
    },
  });
  const handleEdit = () => {
    setEditOpen(true);
  };
  const PersonalDetailsComponent = PersonalDetails as React.ComponentType<{
    form: AnyFormApi;
  }>;
  const handleSave = async () => {
    const userData = form?.state?.values?.personalDetails;
    const finalData =
      form?.state?.values?.personalDetails || initialRegistrationState;
    //console.log("finalData", finalData);
    await dispatch(createPatientUserProfile(finalData));
    setEditOpen(false);
  };
  return (
    <>
      <div className="border border-gray-300 rounded-md mt-3">
        <div className=" flex bg-amber-100  justify-between">
          <div className="flex  gap-2 p-3 ">
            <FaUserAlt className=" text-sky-500" />
            <div className="text-md font-bold">Personal Details</div>
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
                <PersonalDetailsComponent form={form} />
              </form>
            </DialogWindow>
          )}
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
    </>
  );
}
