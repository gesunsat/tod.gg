"use client";

import { useState } from "react";
import Input from "../ui/input"
import { useRouter } from "next/navigation";

export default function SearchCharcter() {
  const [value, setValue] = useState('')
  const router = useRouter()

  const handleSubmit = e => {
    e.preventDefault()
    router.push(`/character/${value}`)
  }

  return (
    <form className="mx-4 flex-1" onSubmit={handleSubmit}>
      <Input className="p-2 w-full" placeholder="캐릭터 이름" type="text" value={value} onChange={e => setValue(e.target.value)} />
      <button type="submit" class="search-submit"></button>
    </form>
  )
}