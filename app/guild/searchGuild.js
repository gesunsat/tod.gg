"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

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
        <div className="relative">
          <Input autoFocus placeholder="길드 이름 (대소문자 구분)" className="text-base pl-3 bg-white dark:bg-muted" value={value} onInput={e => setValue(e.target.value)} />
          <Search className="absolute right-0 top-0 h-full w-9 px-2 text-muted-foreground cursor-pointer" onClick={handleUrlChange} />
        </div>
      </form>
    </div>
  )
}