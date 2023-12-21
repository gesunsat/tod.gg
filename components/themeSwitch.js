"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import MoonIcon from "@/public/moon.svg";
import SunIcon from "@/public/sun.svg";
import { useEffect, useState } from "react";
import Style from './themeSwitch.module.css';
import { cx } from "@/utils/all";

export default function ThemeSwitch({ className, ...props }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false)

  // TODO: setMount 뭔가 쓰는거 아닌거같은데
  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) return null;

  return (
    <div className={className}>
      <Image
        className={cx("shakeAnime cursor-pointer hidden dark:invert dark:block", Style.shakeAnime)}
        src={MoonIcon}
        alt="테마 변경"
        onClick={() => setTheme("light")}
        width={props.height}
      />
      <Image
        className={cx("shakeAnime cursor-pointer invert-0 dark:hidden", Style.shakeAnime)}
        src={SunIcon}
        alt="테마 변경"
        onClick={() => setTheme("dark")}
        width={props.height}
      />
    </div>
  );
};