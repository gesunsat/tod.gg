"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

export default function Providers({ children }) {
  const [mounted, setMounted] = useState(false)

  // TODO: setMount 뭔가 쓰는거 아닌거같은데
  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) return null;

  return (
    <ThemeProvider attribute="class" enableSystem={true}>
      {children}
    </ThemeProvider>
  );
}