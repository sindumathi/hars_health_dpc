"use client";

import TextBox from "../uiComponents/TextBox";
import SelectBox from "../uiComponents/Select";
import { genderData } from "../../data/selectData";
import { createPatientUserProfile } from "@/src/features/redux/slice/resgistrationSlice";
import { useAppDispatch, useAppSelector } from "@/src/features/redux/hooks";
import DatePicker from "../uiComponents/DatePicker";
import { AnyFieldApi } from "@tanstack/react-form";
export default function PersonalDetails({ form }: any) {
  const { Field } = form;

  return (
    <form.FormGroup
      name="personalInfo"
      onGroupSubmit={async ({ value }) => {
        console.log(`Submitting Step name`, value);
      }}
    >
      {(group) => (
        <div className="mx-auto p-8">
          <h1 className="sub-header-text">Personal Details</h1>
          <p className="text-gray-400 text-sm">
            Required fields are marked with *
          </p>
          <div className="grid grid-cols-2 gap-6 m-4">
            <Field name={`${group.name}.firstName`} validators={{}}>
              {(field: AnyFieldApi) => (
                <TextBox
                  textField={field}
                  onChange={(e) => field.handleChange(e.target.value)}
                  variant={"primary"}
                  placeholder="First name"
                />
              )}
            </Field>
            <Field name={`${group.name}.lastName`} validators={{}}>
              {(field: AnyFieldApi) => (
                <TextBox
                  label="Last Name *"
                  textField={field}
                  variant={"primary"}
                  placeholder="Last name"
                />
              )}
            </Field>
            <Field name={`${group.name}.phoneNumber`} validators={{}}>
              {(field: AnyFieldApi) => (
                <TextBox
                  label="Phone Number *"
                  textField={field}
                  variant={"primary"}
                  placeholder="Phone number"
                />
              )}
            </Field>
            <Field name={`${group.name}.patientId`} validators={{}}>
              {(field: AnyFieldApi) => (
                <TextBox
                  label="Patient Id *"
                  textField={field}
                  variant={"primary"}
                  placeholder="Patient Id"
                />
              )}
            </Field>

            <Field name={`${group.name}.dateOfBirth`}>
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
            <Field name={`${group.name}.gender`}>
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
              name={`${group.name}.emergencyContact[0].emergencyContactName`}
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
              name={`${group.name}.emergencyContact[0].relationship`}
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
              name={`${group.name}.emergencyContact[0].contactNumber`}
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
      )}
    </form.FormGroup>
  );
}
