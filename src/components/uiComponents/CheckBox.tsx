import React from "react";
import type { FieldApi } from "@tanstack/react-form";
interface CheckBoxFieldProps {
  field: FieldApi<any, any, any, any, string>;
  label?: string;
  name?: string;
  id: string;
  condition?: object;
  outputFields: [];
  outputFieldType?: string;
}
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
  const [checked, setChecked] = React.useState(value.includes(id));

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
              field.handleChange([...value, data]);
              setChecked(true);
            } else {
              if (outputFieldType === "ARRAYOFOBJECT") {
                field.handleChange(value.filter((val) => val.id !== id));
              } else {
                field.handleChange(value.filter((val) => val !== id));
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
