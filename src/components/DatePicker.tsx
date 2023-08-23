"use client";

import { FC, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { DateRange } from "react-day-picker";

const DatePicker: FC<{}> = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="w-fit py-1 px-2" variant="outline">
          <CalendarIcon></CalendarIcon>
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        <Calendar mode="range" selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
