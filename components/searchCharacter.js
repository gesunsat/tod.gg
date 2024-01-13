"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { Input } from "./ui/input";

export default function SearchCharcter({ className, ...props }) {
  const [value, setValue] = useState('')
  const router = useRouter()

  const handleSubmit = e => {
    e.preventDefault()
    if (value === "") return;
    router.push(`/char/${value}`)
    setValue("");
  }

  return (
    <div className={cn("", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Input autoFocus placeholder="캐릭터 이름" className="text-base pl-3 bg-white dark:bg-muted" value={value} onInput={e => setValue(e.target.value)} />
          <Search className="absolute right-0 top-0 h-full w-9 px-2 text-muted-foreground cursor-pointer" onClick={handleSubmit} />
        </div>
      </form>
    </div>
  )
}