"use client"

import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { getYesterdayDate } from "@/lib/getYesterdayDate"
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function DatePicker({ className, onClick }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [date, setDate] = useState(new Date(searchParams.get("date") || getYesterdayDate()));
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState({
    name: "",
  });

  const handleCalendarSelect = (date) => {
    setCalendarOpen(false);
    setDate(date)

    const updatedQuery = { ...searchQuery, "date": `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}` };
    setSearchQuery(updatedQuery);
    updateSearchQuery(updatedQuery);

    router.refresh();
  }

  const updateSearchQuery = (updatedQuery) => {
    const params = new URLSearchParams(searchParams);
    Object.keys(updatedQuery).forEach((key) => {
      if (updatedQuery[key]) {
        params.set(key, updatedQuery[key]);
      } else {
        params.delete(key);
      }
    });
    const queryString = params.toString();
    const updatedPath = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(updatedPath);
  };

  return (
    <div className={className}>
      <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "h-full justify-start text-left font-normal px-2 py-0",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "yy.MM.dd") : <span className="text-xs">날짜 선택</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex h-auto flex-col space-y-2 p-2" align="start">
          <span className="self-center">데이터 조회 날짜 선택</span>
          <Calendar
            mode="single"
            fromDate={new Date("2023-12-21")}
            toDate={new Date(getYesterdayDate())}
            today={new Date(getYesterdayDate())}
            selected={date}
            defaultMonth={date}
            onDayClick={handleCalendarSelect}
            captionLayout="dropdown-buttons"
            initialFocus
            required
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}