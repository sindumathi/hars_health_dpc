"use client";

import TextBox from "../uiComponents/TextBox";
import SelectBox from "../uiComponents/Select";
import { genderData } from "../../data/selectData";
import DatePicker from "../uiComponents/DatePicker";
import type { AnyFieldApi } from "@tanstack/react-form";
import { ReactFormApi } from "@tanstack/react-form";
import { ReactFormExtendedApi } from "@tanstack/react-form";
import { PatientRegistrationState } from "@/src/features/types/patientRegistrationState.type";

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
        <Field name={`firstName`} defaultValue="" validators={{}}>
          {(field: AnyFieldApi) => (
            <TextBox
              label="First Name *"
              textField={field}
              variant={"primary"}
              placeholder="First name"
            />
          )}
        </Field>
        <Field name={`lastName`} defaultValue="" validators={{}}>
          {(field: AnyFieldApi) => (
            <TextBox
              label="Last Name *"
              textField={field}
              variant={"primary"}
              placeholder="Last name"
            />
          )}
        </Field>
        <Field name={`phoneNumber`} defaultValue="" validators={{}}>
          {(field: AnyFieldApi) => (
            <TextBox
              label="Phone Number *"
              textField={field}
              variant={"primary"}
              placeholder="Phone number"
            />
          )}
        </Field>
        <Field name={`patientId`} defaultValue="" validators={{}}>
          {(field: AnyFieldApi) => (
            <TextBox
              label="Patient Id *"
              textField={field}
              variant={"primary"}
              placeholder="Patient Id"
            />
          )}
        </Field>

        <Field name={`dateOfBirth`}>
          {(field: AnyFieldApi) => (
            <DatePicker
              value={field?.state?.value ? field.state.value : null}
              field={field}
              label="Date of birth *"
              placeholder="Choose date"
              showTimeSelect={false} // set true for datetime
              minDate={new Date()}
              // onChange={(date) => {
              //   console.log(parseISO(field.state.value));
              //   // field.handleChange(date.toISOString());
              //   // field.handleBlur();
              // }}
            />
          )}
        </Field>
        <Field name={`gender`}>
          {(field: AnyFieldApi) => (
            <SelectBox
              label="Gender *"
              items={genderData}
              value={field.state.value}
              onChange={field.handleChange}
            />
          )}
        </Field>
      </div>
      <hr />
      <p className="text-gray-800 text-md mt-4 mb-4">
        Emergency contact <span className="text-gray-400">(optional)</span>
      </p>
      <div className="grid grid-cols-2 gap-6">
        <Field
          name={`emergencyContact[0].emergencyContactName`}
          defaultValue=""
          validators={{}}
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
          name={`emergencyContact[0].relationship`}
          defaultValue=""
          validators={{}}
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
          name={`emergencyContact[0].contactNumber`}
          defaultValue=""
          validators={{}}
        >
          {(field: AnyFieldApi) => (
            <TextBox
              id={field.name}
              label="Phone Number"
              textField={field}
              variant={"primary"}
              placeholder="Phone number"
            />
          )}
        </Field>
      </div>
    </div>
    // </form>
  );
}
