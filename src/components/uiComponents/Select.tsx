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
  onChange?: (value: string) => void;
  value?: string;
}

export default function SelectBox(props: SelectProps) {
  const { items, label = "", onChange, value } = props;
  const displayField = {
    id: 1,
    label: `Select ${label.toLowerCase()}`,
    value: null,
  };
  return (
    <div className="flex flex-col">
      {label && <label className="text-sm">{label}</label>}

      <Select items={items}>
        <SelectTrigger className="w-full max-w-48">
          <SelectValue />
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
