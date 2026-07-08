import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { formatDate } from "../utils/formatters";
import "react-day-picker/style.css";
import classNames from "classnames";
import { format, subYears, subDays, startOfDay } from "date-fns";

interface DatePickerFieldProps {
  mode: string;
  label?: string;
  onChange: (date: Date | null) => void;
  value: Date | undefined;
  error?: string;
}

export default function DatePicker(props: DatePickerFieldProps) {
  const { mode, value, label, onChange, ...rest } = props;
  const [open, setOpen] = useState<boolean>(false);
  const [month, setMonth] = useState<Date>(value ?? new Date());
  const dateDisplayclassNames = classNames(
    " w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-2 transition focus:border-blue-300 focus:ring-1 focus:ring-blue-200 focus:placeholder-transparent",
    {
      day_disabled:
        "text-slate-200 cursor-not-allowed hover:bg-transparent hover:text-slate-200",
    },
  );
  const today = new Date();
  const displayDate = value ? formatDate(value) : formatDate(today);

  function handleSelect(date: Date | undefined) {
    console.log("Date:", date);
    onChange(date);
    setOpen(false);
  }
  return (
    <div className="flex gap-1 flex-col">
      {label && <label className="text-sm">{label}</label>}
      <button
        type="button"
        className={dateDisplayclassNames}
        onClick={() => setOpen((prev: boolean) => !prev)}
      >
        <span className={value ? "text-slate-800" : "text-slate-400"}>
          {displayDate}
        </span>
      </button>

      {open && (
        <DayPicker
          mode={mode}
          selected={value}
          onSelect={handleSelect}
          month={month}
          onMonthChange={setMonth}
          defaultMonth={value ?? today}
          toDate={today}
          captionLayout="dropdown-buttons"
          fromYear={1920}
          toYear={today.getFullYear()}
          showOutsideDays
          {...rest}
          disabled={[
            {
              after: subDays(today, 1), // disables today + future
            },
            {
              before: subYears(today, 150),
            },
          ]}
        />
      )}
    </div>
  );
}
