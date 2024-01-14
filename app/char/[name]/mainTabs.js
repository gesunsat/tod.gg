"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MainTabs(props) {
    const characterName = props.characterName;
    let pathname = usePathname();
    pathname = pathname.replace(`/char/${encodeURI(characterName)}`, "");

    return (
        <>
            <Tabs defaultValue={pathname}>
                <TabsList className="justify-start w-full overflow-x-scroll hidden-scroll flex gap-x-[10px] sm:grid sm:grid-cols-5">
                    <TabsTrigger asChild value="">
                        <Link href={`/char/${characterName}`}>스탯/장비</Link>
                    </TabsTrigger>
                    <TabsTrigger asChild value="/skill">
                        <Link href={`/char/${characterName}/skill`}>스킬</Link>
                    </TabsTrigger>
                    <TabsTrigger disabled value="/union">
                        <Link href={`/char/${characterName}/union`}>유니온</Link>
                    </TabsTrigger>
                    <TabsTrigger asChild value="/content">
                        <Link href={`/char/${characterName}/content`}>컨텐츠/랭킹</Link>
                    </TabsTrigger>
                    <TabsTrigger asChild value="/worldCharacter">
                        <Link href={`/char/${characterName}/worldCharacter`}>보유 캐릭터</Link>
                    </TabsTrigger>
                </TabsList>
            </Tabs>
        </>
    );
}
