"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import MoonIcon from "@/public/moon.svg";
import SunIcon from "@/public/sun.svg";
import { useEffect, useState } from "react";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false)

  // TODO: setMount 뭔가 쓰는거 아닌거같은데
  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) return null;

  return (
    <div>
      <Image
        className="hidden dark:invert dark:block"
        src={MoonIcon}
        alt="테마 변경"
        onClick={() => setTheme("light")}
        width={50}
      />
      <Image
        className="invert-0 dark:hidden"
        src={SunIcon}
        alt="테마 변경"
        onClick={() => setTheme("dark")}
        width={50}
      />
    </div>
  );
};