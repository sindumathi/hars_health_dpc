import React from "react";
import type { FieldApi } from "@tanstack/react-form";
interface CheckBoxFieldProps {
  field: FieldApi<any, any, any, any, string>;
  label?: string;
  name?: string;
  id: string;
  condition?: object;
}
export default React.memo(function CheckBox(props: CheckBoxFieldProps) {
  const { field, label, id, ...restProps } = props;
  const value = field?.state?.value || [];
  const [checked, setChecked] = React.useState(value.includes(id));

  //const checked = value.includes(id);
  console.log("value", value);
  console.log("name", label);
  return (
    <div className="flex">
      <span className="mr-3">
        <input
          type="checkbox"
          checked={checked}
          onBlur={field.handleBlur}
          onChange={(e) => {
            if (e.target.checked) {
              field.handleChange([...value, id]);
              setChecked(true);
            } else {
              field.handleChange(value.filter((val) => val !== id));
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
