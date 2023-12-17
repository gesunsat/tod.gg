"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MagnifyingGlass from "@/public/magnifyingGlass.svg";
import Image from "next/image";
import InputGroup from "../ui/inputGroup";

export default function SearchCharcter() {
  const [value, setValue] = useState('')
  const router = useRouter()

  const handleSubmit = e => {
    e.preventDefault()
    if (value === "") return;
    router.push(`/character/${value}`)
    setValue("");
  }

  return (
    <form className="mx-4 flex-1" onSubmit={handleSubmit}>
      <InputGroup>
        <input className="relative flex-auto p-2 rounded-l-md" placeholder="캐릭터 이름" type="text" value={value} onChange={e => setValue(e.target.value)} />
        <button className="pe-2 relative rounded-r-md" style={{ backgroundColor: "field" }}>
          <Image
            className="dark:invert"
            src={MagnifyingGlass}
            alt="테마 변경"
            width={20}
          />
        </button>
      </InputGroup>
    </form >
  )
}