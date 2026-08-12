"use client";
import { useState, useEffect } from "react";
import TextBox from "../uiComponents/TextBox";
import SelectBox from "../uiComponents/Select";
import { genderData } from "../../data/selectData";
import DatePicker from "../uiComponents/DatePicker";
import type { AnyFieldApi } from "@tanstack/react-form";
import { useAppSelector } from "@/src/features/redux/hooks";
//import { QuestionnaireForm } from "@/src/app/pages/questionnaire/page";
import { ReactFormExtendedApi } from "@tanstack/react-form";
import { PatientRegistrationState } from "@/src/features/types/patientRegistrationState.type";
import { personalDetailsSchema } from "./data/validationSchema";
import { FieldWrapper } from "@/src/utils/formatters";
import { fetchUsers, fetchUniqueUser } from "./DatabaseFetch";

import { RegistrationFormType } from "./data/formType";

type FormProp = {
  form: RegistrationFormType;
};

export default function PersonalDetails({ form }: FormProp) {
  const { Field } = form;
  const initialuserData = { name: "", dateOfBirth: "" };
  const [user, setUser] = useState(initialuserData);
  const authData = useAppSelector((state) => state?.auth);
  const userData = useAppSelector((state) => state.registration);
  useEffect(() => {
    const fetchUser = (async () => {
      const user = await fetchUniqueUser(authData?.userName);
      setUser(user);
    })();
  }, []);

  return (
    // <form
    //   onSubmit={(e) => {
    //     e.preventDefault();
    //   }}
    // >
    <div className="mx-auto p-8">
      <h1 className="sub-header-text">Personal Details</h1>
      <p className="text-gray-400 text-sm">Required fields are marked with *</p>
      <div className="grid grid-cols-2 gap-6 m-4">
        <Field
          name={`personalDetails.firstName`}
          defaultValue={userData?.firstName}
          validators={{ onBlur: personalDetailsSchema.shape.name }}
        >
          {(field: AnyFieldApi) => (
            <FieldWrapper
              error={
                field.state.meta.isTouched && field.state.meta.errors.length
                  ? field.state.meta.errors[0].message
                  : ""
              }
            >
              <TextBox
                label="First Name *"
                textField={field}
                variant={"primary"}
                placeholder="First name"
              />
            </FieldWrapper>
          )}
        </Field>
        <Field
          name={`personalDetails.lastName`}
          defaultValue={userData?.lastName}
          validators={{ onBlur: personalDetailsSchema.shape.name }}
        >
          {(field: AnyFieldApi) => (
            <FieldWrapper
              error={
                field.state.meta.isTouched && field.state.meta.errors.length
                  ? field.state.meta.errors[0].message
                  : ""
              }
            >
              <TextBox
                label="Last Name *"
                textField={field}
                variant={"primary"}
                placeholder="Last name"
              />
            </FieldWrapper>
          )}
        </Field>
        <Field
          name={`personalDetails.phoneNumber`}
          defaultValue={userData?.phoneNumber}
          validators={{ onBlur: personalDetailsSchema.shape.phoneNumber }}
        >
          {(field: AnyFieldApi) => (
            <FieldWrapper
              error={
                field.state.meta.isTouched && field.state.meta.errors.length
                  ? field.state.meta.errors[0].message
                  : ""
              }
            >
              <TextBox
                label="Phone Number *"
                textField={field}
                variant={"primary"}
                placeholder="Phone number"
              />
            </FieldWrapper>
          )}
        </Field>
        <Field
          name={`personalDetails.patientId`}
          defaultValue={userData.patientId}
          validators={{ onBlur: personalDetailsSchema.shape.patientId }}
        >
          {(field: AnyFieldApi) => (
            <FieldWrapper
              error={
                field.state.meta.isTouched && field.state.meta.errors.length
                  ? field.state.meta.errors[0].message
                  : ""
              }
            >
              <TextBox
                label="Patient Id *"
                textField={field}
                variant={"primary"}
                placeholder="Patient Id"
              />
            </FieldWrapper>
          )}
        </Field>

        <Field
          name={`personalDetails.dateOfBirth`}
          defaultValue={user?.dateOfBirth}
          validators={{}}
        >
          {(field: AnyFieldApi) => (
            <DatePicker
              value={field?.state?.value ? field.state.value : ""}
              field={field}
              label="Date of birth *"
              placeholder="Choose date"
              showTimeSelect={false} // set true for datetime
              minDate={new Date()}
            />
          )}
        </Field>
        <Field
          name={`personalDetails.gender`}
          defaultValue={userData?.gender}
          validators={{ onBlur: personalDetailsSchema.shape.gender }}
        >
          {(field: AnyFieldApi) => (
            <FieldWrapper
              error={
                field.state.meta.isTouched && field.state.meta.errors.length
                  ? field.state.meta.errors[0].message
                  : ""
              }
            >
              <SelectBox
                label="Gender *"
                items={genderData}
                value={field.state.value}
                onChange={field.handleChange}
                name={field.name}
              />
            </FieldWrapper>
          )}
        </Field>
      </div>
      <hr />
      <p className="text-gray-800 text-md mt-4 mb-4">
        Emergency contact <span className="text-gray-400">(optional)</span>
      </p>
      <div className="grid grid-cols-2 gap-6">
        <Field
          name={`personalDetails.emergencyContact.emergencyContactName`}
          defaultValue={userData?.emergencyContact?.emergencyContactName}
        >
          {(field: AnyFieldApi) => (
            <TextBox
              id={field.name}
              label="Contact Name"
              textField={field}
              variant={"primary"}
              placeholder="Name"
            />
          )}
        </Field>
        <Field
          name={`personalDetails.emergencyContact.relationship`}
          defaultValue={userData?.emergencyContact?.relationship}
        >
          {(field: AnyFieldApi) => (
            <TextBox
              id={field.name}
              label="Relationship"
              textField={field}
              variant={"primary"}
              placeholder="Relationship"
            />
          )}
        </Field>
        <Field
          name={`personalDetails.emergencyContact.contactNumber`}
          defaultValue={userData?.emergencyContact?.contactNumber}
          validators={{ onBlur: personalDetailsSchema.shape.contactNumber }}
        >
          {(field: AnyFieldApi) => (
            <FieldWrapper
              error={
                field.state.meta.isTouched && field.state.meta.errors.length
                  ? field.state.meta.errors[0].message
                  : ""
              }
            >
              <TextBox
                id={field.name}
                label="Phone Number"
                textField={field}
                variant={"primary"}
                placeholder="Phone number"
              />
            </FieldWrapper>
          )}
        </Field>
      </div>
    </div>
    // </form>
  );
}
