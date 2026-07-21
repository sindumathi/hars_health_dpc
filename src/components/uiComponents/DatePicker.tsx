"use client";

import * as React from "react";
import { format, subYears, subDays, parseISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import { FieldApi } from "@tanstack/react-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerFieldProps {
  field: FieldApi<Date | undefined, any, any, any>;
  value?: Date | string | null;
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
  console.log("tupeof:", typeof value);
  console.log("val", value);
  //console.log("parse", parseISO(value));
  //const value = field.state.value;
  const error = field.state.meta.errors?.[0];
  const today = new Date();

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
                !value && "text-muted-foreground",
              )}
              disabled={disabled}
              onBlur={() => field.handleBlur()}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {value ? (
                typeof value === "string" ? (
                  format(parseISO(value), "MM/dd/yyyy")
                ) : (
                  format(value, "MM/dd/yyyy")
                )
              ) : (
                <span>{placeholder}</span>
              )}
            </button>
          )}
        />
        {/* <PopoverTrigger>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground",
            )}
            disabled={disabled}
            onBlur={() => field.handleBlur()}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? (
              typeof value === "string" ? (
                format(parseISO(value), "MM/dd/yyyy")
              ) : (
                format(value, "MM/dd/yyyy")
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger> */}

        <PopoverContent className="w-auto p-0" align="start">
          <DayPicker
            mode="single"
            selected={value}
            onSelect={(date) => {
              field.handleChange(date ?? null);
              setOpen(false);
            }}
            fromDate={minDate}
            toDate={maxDate}
            initialFocus
            className="p-3"
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

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
