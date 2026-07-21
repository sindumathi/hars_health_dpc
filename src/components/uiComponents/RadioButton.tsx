import { useState } from "react";
import { AnyFieldApi } from "@tanstack/react-form";
type OptionProp = { label: string; value: string };
interface RadioButtonProps {
  label?: string;
  field?: AnyFieldApi;
  option: OptionProp;
}
export default function RadioButton(props: RadioButtonProps) {
  const { label, field, option, ...restProps } = props;
  const [optionSelected, setOptionSelected] = useState("");
  const handleChange = () => {
    if (field) {
      field.handleChange(option.value);
    } else {
      setOptionSelected(option.value);
    }
  };

  return (
    <div className="flex gap-2">
      <div>
        <input
          type="radio"
          checked={
            field
              ? field?.state?.value === option.value
              : optionSelected === option.value
          }
          onChange={handleChange}
          {...restProps}
        />
      </div>
      {((option && option.label) || label) && (
        <label>{label || option?.label}</label>
      )}
    </div>
  );
}
