"use client";
import classNames from "classnames";
import { useState } from "react";
import { HiOutlineEye } from "react-icons/hi";
import { HiOutlineEyeOff } from "react-icons/hi";
import { AnyFieldApi } from "@tanstack/react-form";
interface TextBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  passwordField?: boolean;
  variant?: string;
  textField?: AnyFieldApi;
  value?: string | number;
  handleChange?: (value: string) => void;
}

const TextBox = function (props: TextBoxProps) {
  const {
    textField,
    value,
    label,
    variant,
    passwordField,
    className = "",
    handleChange,
    ...rest
  } = props;
  const [textValue, setTextValue] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const inputClassNames = classNames("w-full ", `${className}`, {
    "rounded-md border border-gray-300 px-3 py-2 text-sm text-neutral-900":
      variant === "normal",
    "rounded-lg border border-gray-300 px-4 py-2 transition focus:border-blue-300 focus:ring-1 focus:ring-blue-200 focus:placeholder-transparent":
      variant === "primary",
  });
  const handleTextValueChange = (e) => {
    if (textField) {
      textField.handleChange(e.target.value);
    } else if (handleChange) {
      handleChange(e.target.value);
    } else {
      setTextValue(e.target.value);
    }
  };
  const handlePasswordDisplay = () => {
    setShowPassword((prev: boolean) => !prev);
  };
  const handleBlur = () => {};
  return (
    <div className="flex gap-1 flex-col ">
      {label && <label className="text-sm">{label}</label>}

      <input
        type={passwordField && showPassword ? "password" : "text"}
        className={inputClassNames}
        onChange={(e) => handleTextValueChange(e)}
        onBlur={textField ? textField.handleBlur : handleBlur}
        value={textField ? textField.state.value : value ? value : textValue}
        {...rest}
      />
      <div
        className="absolute right-0  top-1/2 pr-3 -translate-y-1/2 "
        onClick={handlePasswordDisplay}
      >
        {showPassword
          ? passwordField && (
              <HiOutlineEyeOff className="h-5 w-5 text-gray-400" />
            )
          : passwordField && <HiOutlineEye className="h-5 w-5 text-gray-400" />}
      </div>
    </div>
  );
};

export default TextBox;
