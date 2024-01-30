"use client";

import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import { EqualIcon, XIcon } from "lucide-react";
import { NavigationMenuLink } from "./ui/navigation-menu";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function ReorederItem({ value, valueIndex, draggable, removeFavoriteCharacter }) {
  const controls = useDragControls();
  const y = useMotionValue(0);

  return (
    <Reorder.Item
      className={cn(
        "w-[80vw] max-w-[300px] flex place-items-center justify-between touch-pan-x",
        draggable ? "px-0" : "px-4"
      )}
      value={value}
      style={{ y }}
      dragListener={false}
      dragControls={controls}
    >
      <div
        className={draggable ? "block opacity-100" : "hidden opacity-0"}
        onPointerDown={() => removeFavoriteCharacter(valueIndex)}
      >
        <XIcon className="h-auto p-2 w-10 cursor-pointer transition-all opacity-50 hover:opacity-100 scale-75 hover:scale-100" />
      </div>

      <ListItem href={`/char/${value.character_name}`} value={value}>
        Re-usable components built using Radix UI and Tailwind CSS.
      </ListItem>

      <div
        className={draggable ? "block opacity-100 " : "hidden opacity-0"}
        onPointerDown={(e) => { if (navigator.vibrate) navigator.vibrate(50); controls.start(e); }}
      >
        <EqualIcon className={"h-auto p-2 w-10 cursor-grab"} />
      </div>
    </Reorder.Item>
  )
}

const ListItem = forwardRef(({ className, title, value, children, ...props }, ref) => {
  return (
    <div className="w-full">
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center text-left h-11 gap-x-3">
            <div className="relative rounded-full overflow-hidden w-[44px] h-[44px]">
              <Image
                className="h-[96px] w-[96px] max-w-none absolute -top-[24px] left-1/2 -translate-x-1/2"
                src={value.character_image}
                alt={value.character_name}
                height={96}
                width={96}
              />
            </div>
            <div className="space-y-2">
              <div className="font-medium leading-none">{value.character_name}</div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                Lv.{value.character_level} | {value.character_class}
              </p>
            </div>
          </div>
        </a>
      </NavigationMenuLink>
    </div >
  )
})
ListItem.displayName = "ListItem"