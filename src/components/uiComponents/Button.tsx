import { ButtonHTMLAttributes, SubmitEvent } from "react";
import classNames from "classnames";

interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick"
> {
  onClick: (event: SubmitEvent<HTMLFormElement>) => void;
  children: string;
  primary?: boolean;
  secondary?: boolean;
  success?: boolean;
  warning?: boolean;
  danger?: boolean;
  outline?: boolean;
  rounded?: boolean;
  variant?: string;
}

export default function Button(props: ButtonProps) {
  const {
    children,
    variant,
    primary,
    secondary,
    success,
    warning,
    danger,
    outline,
    rounded,
    ...rest
  } = props;
  const finalClassNames = classNames(
    "flex items-center px-3 py-1.5 border cursor-pointer",
    {
      "border-blue-500 bg-sky-800 text-white ":
        primary || variant === "primary",
      "border-gray-500 bg-gray-500 text-white ":
        secondary || variant === "secondary",
      "border-green-500 bg-blue-500 text-white ": success,
      "border-yellow-500 bg-yellow-500 text-white ": warning,
      "border-red-500 bg-red-500 text-white": danger,
      "!text-blue-500": outline && primary,
      "!text-gray-900": outline && secondary,
      "!text-green-500": outline && success,
      "!text-yellow-400": outline && warning,
      "!text-red-500": outline && danger,
      "bg-white": outline,
      "rounded-lg": rounded,
    },
  );

  return (
    <button className={finalClassNames} {...rest}>
      {children}
    </button>
  );
}
