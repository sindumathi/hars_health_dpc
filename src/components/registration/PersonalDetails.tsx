"use client";

import TextBox from "../uiComponents/TextBox";
import SelectBox from "../uiComponents/Select";
import { genderData } from "../../data/selectData";
import DatePicker from "../uiComponents/DatePicker";
import type { AnyFieldApi } from "@tanstack/react-form";
import { ReactFormApi } from "@tanstack/react-form";
import { ReactFormExtendedApi } from "@tanstack/react-form";
import { PatientRegistrationState } from "@/src/features/types/patientRegistrationState.type";
import { personalDetailsSchema } from "./data/validationSchema";
import { FieldWrapper } from "@/src/utils/formatters";
export default function PersonalDetails({ form }) {
  const { Field } = form;

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
          defaultValue=""
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
          defaultValue=""
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
          defaultValue=""
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
          defaultValue=""
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

        <Field name={`personalDetails.dateOfBirth`} validators={{}}>
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
          name={`personalDetails.emergencyContact[0].emergencyContactName`}
          defaultValue=""
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
          name={`personalDetails.emergencyContact[0].relationship`}
          defaultValue=""
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
          name={`personalDetails.emergencyContact[0].contactNumber`}
          defaultValue=""
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
