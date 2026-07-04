import classNames from "classnames";

interface TextBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  primary?: boolean;
  normal?: boolean;
}

const TextBox = function (props: TextBoxProps) {
  const { label, primary, normal, className = "", onChange, value } = props;
  const handleChange = () => {};
  const inputClassNames = classNames("w-full ", `${className}`, {
    "rounded-md border border-gray-300 px-3 py-2 text-sm text-neutral-900":
      normal,
    "rounded-lg border border-gray-300 px-4 py-2 transition focus:border-blue-300 focus:ring-1 focus:ring-blue-200 focus:placeholder-transparent":
      primary,
  });
  return (
    <div className="flex gap-1 flex-col">
      {label && <label className="text-sm">{label}</label>}
      <input
        className={inputClassNames}
        onChange={handleChange}
        value={value}
        {...props}
      />
    </div>
  );
};

TextBox.displayName = "TextBox";
export default TextBox;
