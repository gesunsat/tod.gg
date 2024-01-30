"use client";

import { Fragment, forwardRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Check, EditIcon, Equal, GripIcon, LucideStretchHorizontal, MenuIcon, Search, Star, StretchHorizontal, XIcon } from "lucide-react";
import { Input } from "./ui/input";
import { NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuViewport, navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { Reorder } from "framer-motion";
import ReorederItem from "./reorderItem";

export default function SearchCharcter({ className, ...props }) {
  const [value, setValue] = useState('');
  const router = useRouter();

  const handleSubmit = e => {
    e.preventDefault()
    if (value === "") return;
    router.push(`/char/${value}`)
    setValue("");
  };

  const [draggable, setDraggable] = useState(false);
  const [favoriteCharacters, setFavoriteCharacters] = useState(JSON.parse(localStorage.getItem("favoriteCharacters") || "[]"));
  useEffect(() => {
    localStorage.setItem("favoriteCharacters", JSON.stringify(favoriteCharacters))
  }, [favoriteCharacters]);

  const removeFavoriteCharacter = (arrIndex) => {
    const newFavoriteCharacters = [...favoriteCharacters];
    newFavoriteCharacters.splice(arrIndex, 1);

    setFavoriteCharacters(newFavoriteCharacters);
    localStorage.setItem("favoriteCharacters", JSON.stringify(newFavoriteCharacters));
  }
  const updateFavoriteCharacters = () => {
    setFavoriteCharacters(JSON.parse(localStorage.getItem("favoriteCharacters") || "[]"));
  }

  return (
    <div className={cn("", className)} {...props}>
      <div className="relative">
        <div className="absolute left-0 top-0 h-full text-muted-foreground flex place-items-center">
          <NavigationMenu delayDuration={0} className="select-none" onValueChange={updateFavoriteCharacters}>
            <NavigationMenuList>
              <NavigationMenuItem value="navigationItemFavoriteCharacter">
                <NavigationMenuTrigger className={"bg-transparent pl-2 pr-0"}>
                  <Star />
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="flex justify-between p-4 pb-0">
                    <h1 className="scroll-m-20 text-xl font-bold tracking-tight">
                      즐겨찾기
                    </h1>
                    <div className="flex items-center">
                      <button
                        className="flex items-center text-positive-lesser transition-all opacity-50 hover:opacity-100 scale-75 hover:scale-100"
                        onClick={() => setDraggable((prev) => !prev)}
                      >
                        {draggable ? <Check /> : <EditIcon />}
                      </button>
                    </div>
                  </div>
                  <div className="grid gap-3 py-4">
                    {
                      favoriteCharacters.length == 0 ?
                        <div className="px-4 w-[300px] flex flex-col place-items-center justify-center my-5 space-y-2">
                          <div>
                            <span>캐릭터를 검색하고</span>
                          </div>
                          <div className="flex self-center">
                            <span className="mr-1">이미지 오른쪽 위</span>
                            <Star className="h-auto" />
                            <span>을 눌러주세요</span>
                          </div>
                        </div> :
                        <Reorder.Group axis="y" values={favoriteCharacters} onReorder={setFavoriteCharacters}>
                          {
                            favoriteCharacters.map((value, valueIndex) => (
                              <ReorederItem
                                key={value.character_name}
                                value={value}
                                valueIndex={valueIndex}
                                draggable={draggable}
                                removeFavoriteCharacter={removeFavoriteCharacter}
                              />
                            ))
                          }
                        </Reorder.Group>
                    }
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <form onSubmit={handleSubmit}>
          <Input autoFocus placeholder="캐릭터 이름" className="text-base pl-14 bg-white dark:bg-muted" value={value} onInput={e => setValue(e.target.value)} />
          <div className="absolute right-0 top-0 h-full pr-2 text-muted-foreground cursor-pointer flex place-items-center">
            <Search className="w-9 transition-all stroke-black dark:stroke-white opacity-60 hover:opacity-100" onClick={handleSubmit} />
          </div>
        </form>
      </div>
    </div>
  )
}