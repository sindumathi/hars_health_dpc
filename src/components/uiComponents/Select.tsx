"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface ItemProps {
  id: number;
  label: string;
  value: string | null;
}
interface SelectProps {
  items: ItemProps[];
  label: string;
  onChange?: (value: string | null) => void;
  value?: string;
  disabled?: boolean;
  name?: string;
}

export default function SelectBox(props: SelectProps) {
  const {
    items,
    name,
    label = "",
    disabled = false,
    onChange,
    value = null,
  } = props;
  // const displayField = {
  //   id: 1,
  //   label: `Select ${label.toLowerCase()}`,
  //   value: null,
  // };
  const displayvalue = value
    ? `${value?.charAt(0).toUpperCase() + value.slice(1)}`
    : "";
  return (
    <div className="flex flex-col">
      {label && <label className="text-sm">{label}</label>}

      <Select
        name={name}
        value={displayvalue}
        disabled={disabled}
        onValueChange={onChange}
      >
        <SelectTrigger className="w-full max-w-48">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {items.map((item) => (
              <SelectItem key={item.id} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
