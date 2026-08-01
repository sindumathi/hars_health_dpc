import React from "react";
import type { AnyFieldApi } from "@tanstack/react-form";
import { ExistingConditionsData } from "../../features/types/patientRegistrationState.type";
interface CheckBoxFieldProps {
  field: AnyFieldApi;
  label?: string;
  name?: string;
  id: string;
  condition?: object;
  outputFields?: [];
  outputFieldType?: string;
}

type CheckboxValueType = ExistingConditionsData | string;
export default React.memo(function CheckBox(props: CheckBoxFieldProps) {
  const {
    field,
    label,
    id,
    outputFieldType = "ARRAY",
    outputFields = ["id"],
    ...restProps
  } = props;
  const value = field?.state?.value || [];
  const checkedValue = value.some((val: CheckboxValueType) =>
    typeof val === "string" ? val === id : val?.id === id,
  );

  const [checked, setChecked] = React.useState(checkedValue);

  //const checked = value.includes(id);
  const outputDataForCheckBox = () => {
    if (outputFieldType === "ARRAYOFOBJECT") {
      return { id: id, label: label };
    } else {
      return id;
    }
  };
  return (
    <div className="flex">
      <span className="mr-3">
        <input
          type="checkbox"
          checked={checked}
          onBlur={field.handleBlur}
          onChange={(e) => {
            if (e.target.checked) {
              const data = outputDataForCheckBox();
              console.log("checked", value);
              field.handleChange([...value, data]);
              setChecked(true);
            } else {
              if (outputFieldType === "ARRAYOFOBJECT") {
                console.log("arrY");
                field.handleChange(
                  value.filter(
                    (val: CheckboxValueType) =>
                      typeof val !== "string" && val?.id !== id,
                  ),
                );
              } else {
                console.log("what am i");
                field.handleChange(
                  value.filter((val: CheckboxValueType) => val !== id),
                );
              }
              setChecked(false);
            }
            //setChecked(!checked);
          }}
          {...restProps}
        />
      </span>
      {label && (
        <span>
          <label className="text-sm">{label}</label>
        </span>
      )}
    </div>
  );
});
