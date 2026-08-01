"use client";

import * as React from "react";
import { format, subYears, subDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
// import "react-day-picker/dist/style.css";
import "react-day-picker/style.css";

import { AnyFieldApi } from "@tanstack/react-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerFieldProps {
  field: AnyFieldApi;
  value?: Date | undefined;
  label?: string;
  placeholder?: string;
  showTimeSelect?: boolean;
  className?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

export default function DatePicker({
  field,
  value,
  label,
  placeholder = "Pick a date",
  className,
  disabled = false,
  minDate,
  maxDate,
}: DatePickerFieldProps) {
  const [open, setOpen] = React.useState(false);
  const error = field.state.meta.errors?.[0];
  const today = new Date();
  console.log("value", value);
  console.log("field val", field.state.value);
  const selectedDate = value
    ? new Date(value)
    : field?.state?.value
      ? new Date(field.state.value)
      : undefined;
  const defaultClassNames = getDefaultClassNames();
  console.log("defaultClassNames", defaultClassNames);
  return (
    <div className={cn("space-y-2", "flex flex-col")}>
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={(triggerProps) => (
            <button
              type="button"
              {...triggerProps}
              className={cn(
                "w-full justify-start text-left font-normal flex items-center px-3 py-1.5 border cursor-pointer bg-white",
                !selectedDate && "text-muted-foreground",
              )}
              disabled={disabled}
              onBlur={() => field.handleBlur()}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? (
                format(selectedDate, "MM/dd/yyyy")
              ) : (
                <span>{placeholder}</span>
              )}
            </button>
          )}
        />

        <PopoverContent
          className="w-auto p-0 focus:outline-none focus:ring-0"
          align="start"
        >
          <DayPicker
            mode="single"
            captionLayout="dropdown"
            classNames={{
              today: `border-sky-500`, // Add a border to today's date
              selected: `bg-sky-500 border-amber-500 text-white`, // Highlight the selected day
              root: `${defaultClassNames.root} shadow-lg p-5 !outline-none !focus:outline-none`, // Add a shadow to the root element
              chevron: `${defaultClassNames.chevron} !fill-sky-500 !mx-2`, // Change the color of the chevron
              dropdown_root: `${defaultClassNames.dropdown_root} border text-sm border-slate-300 p-2 !focus:outline-none !focus:ring-0  `,
              caption_label: `!focus:outline-none !focus:ring-0 `,
              dropdown: `${defaultClassNames.dropdown} !focus:outline-none !focus:ring-0 border border-slate-300 p-2 `,
            }}
            navLayout="around"
            fixedWeeks
            animate
            selected={selectedDate}
            onSelect={(date) => {
              const dateInString = date?.toISOString();
              const formatedDate = dateInString
                ? format(dateInString, "MM/dd/yyyy")
                : undefined;
              field.handleChange(formatedDate ?? undefined);
              setOpen(false);
            }}
            disabled={[
              {
                after: subDays(today, 1), // disables today + future
              },
              {
                before: subYears(today, 150),
              },
            ]}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
