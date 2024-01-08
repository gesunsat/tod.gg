"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MagnifyingGlassIcon from "@/public/magnifyingGlass.svg";
import InputGroup from "./ui/inputGroup";
import { cn } from "@/lib/utils";

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
        <InputGroup>
          <input autoFocus className="relative flex-auto p-2 rounded-l-md focus:outline-none" placeholder="캐릭터 이름" type="text" value={value} onChange={e => setValue(e.target.value)} />
          <button aria-label="검색버튼" className="pe-2 relative rounded-r-md" style={{ backgroundColor: "field" }}>
            <MagnifyingGlassIcon
              className="fill-black dark:fill-white"
              width={20}
            />
          </button>
        </InputGroup>
      </form>
    </div>
  )
}