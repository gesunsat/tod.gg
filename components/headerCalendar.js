"use client"

import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useEffect, useState } from "react"
import { CalendarIcon } from "lucide-react"
import { getYesterdayDate } from "@/lib/getYesterdayDate"
import { Input } from "./ui/input"

export function HeaderCalendar({ className }) {
  const [date, setDate] = useState(new Date(getYesterdayDate()));

  const [calendarOpen, setCalendarOpen] = useState(false);
  useEffect(() => {

  }, [date]);

  const handleCalendarSelect = (e) => {
    console.log(e)
    setCalendarOpen(false);
    setDate(e)
  }

  return (
    <div className={className}>
      <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal px-2 py-1",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "yy.MM.dd") : <span className="text-xs">날짜 선택</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex w-auto flex-col space-y-2 p-2" align="start">
          <span className="self-center">데이터 조회 날짜 선택</span>
          <Calendar
            mode="single"
            fromDate={new Date("2023-12-20")}
            toDate={new Date(getYesterdayDate())}
            today={new Date(getYesterdayDate())}
            selected={date}
            defaultMonth={date}
            onSelect={handleCalendarSelect}
            captionLayout="dropdown-buttons"
            initialFocus
            required
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}