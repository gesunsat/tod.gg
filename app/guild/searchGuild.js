"use client";

import { useRouter } from "next/navigation";
import MagnifyingGlassIcon from "@/public/magnifyingGlass.svg";
import InputGroup from "../../components/ui/inputGroup";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function SearchGuild({ className, ...props }) {
  const { replace } = useRouter();
  const [value, setValue] = useState("");
  const { toast } = useToast();

  const handleUrlChange = (e) => {
    e.preventDefault();
    if (value.length <= 1) {
      toast({
        variant: "destructive",
        description: "검색어는 2자 이상 입력해야 합니다.",
      })
      replace("/guild");
      return;
    }

    replace(`/guild?q=${value}`);
  };

  return (
    <div className={cn("", className)} {...props}>
      <form onSubmit={handleUrlChange}>
        <InputGroup>
          <input
            autoFocus
            className="relative flex-auto p-2 rounded-l-md focus:outline-none"
            placeholder="길드 이름 (대소문자 구분)"
            type="text"
            value={value}
            onInput={e => setValue(e.target.value)}
          />
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