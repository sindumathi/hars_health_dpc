import { AnyFieldApi } from "@tanstack/react-form";
import classNames from "classnames";
import { useState } from "react";
export type TextAreaChange = React.ChangeEvent<HTMLTextAreaElement>;
interface TextAreaProps {
  textAreaField: AnyFieldApi;
  placeholder?: string;
  value?: string;
  variant?: string;
  className?: string;
}

export default function TextArea(props: TextAreaProps) {
  const {
    value,
    variant = "primary",
    textAreaField,
    placeholder,
    className,
    ...rest
  } = props;
  const [tAreaValue, setTAreaValue] = useState("");
  const inputClassNames = classNames(
    "w-full resize-none min-h-[2lh] ",
    `${className}`,
    {
      "rounded-md border border-gray-300 px-3 py-2 text-sm text-neutral-900":
        variant === "normal",
      "rounded-lg border border-gray-300 px-3 py-1 transition focus:border-blue-300 focus:ring-1 focus:ring-blue-200 focus:placeholder-transparent":
        variant === "primary",
    },
  );
  const handleTextAreaChange = (e: TextAreaChange) => {
    if (textAreaField) {
      textAreaField.handleChange(e.target.value);
    } else {
      setTAreaValue(e.target.value);
    }
  };
  return (
    <>
      <textarea
        name={textAreaField.name}
        className={inputClassNames}
        value={textAreaField ? textAreaField.state.value : tAreaValue}
        onBlur={textAreaField.handleBlur}
        onChange={handleTextAreaChange}
        placeholder={placeholder}
        {...rest}
      />
    </>
  );
}
