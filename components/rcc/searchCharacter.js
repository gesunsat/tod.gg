"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MagnifyingGlassIcon from "@/public/magnifyingGlass.svg";
import InputGroup from "../ui/inputGroup";

export default function SearchCharcter() {
  const [value, setValue] = useState('')
  const router = useRouter()

  const handleSubmit = e => {
    e.preventDefault()
    if (value === "") return;
    router.push(`/char/${value}`)
    setValue("");
  }

  return (
    <form className="mx-0 sm:mx-4 flex-1" onSubmit={handleSubmit}>
      <InputGroup>
        <input className="relative flex-auto p-2 rounded-l-md focus:outline-none" placeholder="캐릭터 이름" type="text" value={value} onChange={e => setValue(e.target.value)} />
        <button className="pe-2 relative rounded-r-md" style={{ backgroundColor: "field" }}>
          <MagnifyingGlassIcon
            className="fill-black dark:fill-white"
            alt="검색버튼"
            width={20} />
        </button>
      </InputGroup>
    </form >
  )
}