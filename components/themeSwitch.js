"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import MoonIcon from "@/public/moon.svg";
import SunIcon from "@/public/sun.svg";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme

  return (
    <Image
        src={currentTheme === 'dark' ? MoonIcon : SunIcon}
        alt="테마 변경"
        onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
        width={50}
    />
  );
};