"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { type DateRange } from "react-day-picker";
import { cn } from "~/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { Calendar } from "./calendar";

interface DatePickerWithRangeProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultStartDate?: string;
  defaultEndDate?: string;
}

export const DatePickerWithRange: React.FC<DatePickerWithRangeProps> = ({
  className,
  defaultStartDate,
  defaultEndDate,
}) => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: defaultStartDate ? new Date(defaultStartDate) : undefined,
    to: defaultEndDate ? new Date(defaultEndDate) : undefined,
  });

  const handleDateChange = (newDate: DateRange | undefined) => {
    setDate(newDate);
    if (newDate?.from && newDate?.to) {
      // Update OverviewLayout with new date range
      const event = new CustomEvent('dateRangeChanged', {
        detail: {
          startDate: newDate.from.toISOString().split('T')[0],
          endDate: newDate.to.toISOString().split('T')[0],
        },
      });
      window.dispatchEvent(event);
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"neutral"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};