"use client";
import classNames from "classnames";
import { useState } from "react";
import { HiOutlineEye } from "react-icons/hi";
import { HiOutlineEyeOff } from "react-icons/hi";
interface TextBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  primary?: boolean;
  normal?: boolean;
  passwordField?: boolean;
  variant?: string;
}

const TextBox = function (props: TextBoxProps) {
  const {
    label,
    primary,
    variant,
    normal,
    passwordField,
    className = "",
    onChange,
    value,
  } = props;
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const inputClassNames = classNames("w-full ", `${className}`, {
    "rounded-md border border-gray-300 px-3 py-2 text-sm text-neutral-900":
      normal || variant === "normal",
    "rounded-lg border border-gray-300 px-4 py-2 transition focus:border-blue-300 focus:ring-1 focus:ring-blue-200 focus:placeholder-transparent":
      primary || variant === "primary",
  });
  const handlePasswordDisplay = () => {
    setShowPassword((prev: boolean) => !prev);
  };
  return (
    <div className="flex gap-1 flex-col ">
      {label && <label className="text-sm">{label}</label>}

      <input
        type={passwordField && showPassword ? "password" : "text"}
        className={inputClassNames}
        onChange={onChange}
        value={value}
        {...props}
      />
      <div
        className="absolute right-0  top-1/2 pr-3 -translate-y-1/2 "
        onClick={handlePasswordDisplay}
      >
        {showPassword ? (
          <HiOutlineEyeOff className="h-5 w-5 text-gray-400" />
        ) : (
          <HiOutlineEye className="h-5 w-5 text-gray-400" />
        )}
      </div>
    </div>
  );
};

export default TextBox;
