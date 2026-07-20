"use client";
import { useState } from "react";
import { AnyFieldApi } from "@tanstack/react-form";
import { medicalHistoryData } from "@/src/data/checkBoxData";
import {
  ExistingConditionsData,
  MedicationsData,
} from "@/src/features/types/patientRegistrationState.type";
import CheckBox from "../uiComponents/CheckBox";
import TextBox from "../uiComponents/TextBox";
import Button from "../uiComponents/Button";
import { MdOutlineClear } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const TABLE_HEADERS = ["Medications", "Dose", "Frequency"];
const MEDICATION_FIELD = { medName: "", medDosage: "", medFrequency: "" };

interface MedicalHistoryData {
  id: number;
  displayText: string;
  category: string;
}

// export type ExistingConditionsData = {
//   id: number;
//   conditionName: string;
//   category: string;
// };

// export type MedicationsData = {
//   medName: string;
//   medDosage: string;
//   medFrequency: string;
// };
// export interface MedicalHistoryState {
//   existingConditions: ExistingConditionsData[];
//   allergies: string[];
//   medications: MedicationsData[];
// }
export default function MedicalHistory({ form }) {
  const { Field } = form;
  const [allergyInput, setAllergyInput] = useState("");
  const handleAddAllergies = (field: AnyFieldApi) => {
    const allergy = allergyInput.trim();
    if (!allergy) return;
    field.pushValue(allergy);
    setAllergyInput("");
  };
  const handleAddMedication = (field: AnyFieldApi) => {
    field.pushValue(MEDICATION_FIELD);
  };
  const handleRemove = (field: AnyFieldApi, index: number) => {
    if (field?.state?.value?.length <= 0) return;
    field.removeValue(index);
  };
  const displayAllergies = (
    field: AnyFieldApi,
    allergy: string,
    index: number,
  ) => {
    return (
      <>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
          {allergy}
          <MdOutlineClear
            onClick={() => handleRemove(field, index)}
            className="cursor-pointer hover:text-red-500 transition-colors duration-200"
          />
        </span>
      </>
    );
  };

  const displayTextFieldInTable = (field: AnyFieldApi) => {
    return (
      <TextBox
        variant={"primary"}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      />
    );
  };
  return (
    <div className="mx-auto p-8">
      <p className=" pb-1">
        <h1 className="sub-header-text font-bold pb-2">Existing conditions</h1>{" "}
        <span className="text-xs">
          Tick any conditions that apply. This helps your care team prepare.
        </span>
      </p>
      {/* Existing conditions --------------------------------*/}
      <Field name="existingConditions" mode="array">
        {(field: AnyFieldApi) => (
          <>
            {medicalHistoryData.map((condition) => (
              <div
                className="p-1"
                key={`${condition.id}_${condition.conditionName}`}
              >
                <CheckBox
                  id={condition.id}
                  label={condition.conditionName}
                  field={field}
                />
              </div>
            ))}
          </>
        )}
      </Field>
      {/*Allergies---------------------------*/}
      <Field name={`allergies`} mode="array" validators={{}}>
        {(field: AnyFieldApi) => (
          <div className="flex flex-col  gap-2 w-full">
            <div className="sub-header-text font-bold pb-2"> Allergies</div>
            {field?.state?.value?.length > 0 && (
              <div className="flex gap-1">
                {field?.state?.value?.map((allergy: string, index: number) =>
                  displayAllergies(field, allergy, index),
                )}
              </div>
            )}
            <div className="flex gap-2">
              <div className=" w-4/5">
                <TextBox
                  id={field.name}
                  value={allergyInput}
                  onChange={(e) => setAllergyInput(e.target.value)}
                  variant={"primary"}
                  placeholder=""
                />
              </div>
              <div className="inline-block pb-1">
                <Button
                  variant="primary"
                  onClick={() => handleAddAllergies(field)}
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        )}
      </Field>
      <Field name="medications" mode="array">
        {(field: AnyFieldApi) => (
          <>
            <div>
              {console.log(
                "stale value",
                field?.state?.value?.length > 0 &&
                  field?.state?.value?.at(-1).medName,
              )}
            </div>
            <table className="w-full border p-3 mt-4">
              <thead className="bg-gray-200">
                <tr>
                  {TABLE_HEADERS.map((heading, index) => (
                    <th
                      key={`heading_${index}`}
                      className={`text-left p-3 text-bold-800 ${index < TABLE_HEADERS.length - 1 && " border-r-2 border-r-white"}`}
                    >
                      {heading}
                    </th>
                  ))}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {field?.state?.value?.map((_, index: number) => (
                  <tr key={`medication_row_${index}`}>
                    <td className="p-3">
                      <Field name={`medications[${index}].medName`}>
                        {(subField: AnyFieldApi) =>
                          displayTextFieldInTable(subField)
                        }
                      </Field>
                    </td>
                    <td className="p-3">
                      <Field name={`medications[${index}].medDosage`}>
                        {(subField: AnyFieldApi) =>
                          displayTextFieldInTable(subField)
                        }
                      </Field>
                    </td>
                    <td className="p-3">
                      <Field name={`medications[${index}].medFrequency`}>
                        {(subField: AnyFieldApi) =>
                          displayTextFieldInTable(subField)
                        }
                      </Field>
                    </td>
                    <td className="p-3">
                      <MdDelete
                        className="text-sky-800 cursor-pointer hover:text-red-500 transition-colors duration-200"
                        onClick={() => handleRemove(field, index)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4">
              <form.Subscribe selector={(state) => state.values.medications}>
                {(medications: MedicationsData[]) => (
                  <Button
                    variant={
                      field?.state?.value?.length <= 0 ||
                      (medications.length > 0 &&
                        medications[medications.length - 1].medName.length > 3)
                        ? "primary"
                        : "secondary"
                    }
                    onClick={() => handleAddMedication(field)}
                    disabled={
                      medications.length > 0 &&
                      medications[medications.length - 1].medName.length <= 3
                    }
                  >
                    {"+ Add Medication"}
                  </Button>
                )}
              </form.Subscribe>
            </div>
          </>
        )}
      </Field>
    </div>
  );
}
