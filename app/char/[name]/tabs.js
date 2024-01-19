"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function CharTabs(props) {
    const characterName = props.characterName;
    let pathname = usePathname();
    pathname = pathname.replace(`/char/${encodeURI(characterName)}`, "");

    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const queryString = params.toString();

    return (
        <>
            <Tabs defaultValue={pathname} value={pathname}>
                <TabsList className="justify-start w-full overflow-x-scroll hidden-scroll flex gap-x-[10px] sm:grid sm:grid-cols-6">
                    <TabsTrigger asChild value="">
                        <Link href={`/char/${characterName}${queryString ? `?${queryString}` : ""}`}>스탯/장비</Link>
                    </TabsTrigger>
                    <TabsTrigger asChild value="/skill">
                        <Link href={`/char/${characterName}/skill${queryString ? `?${queryString}` : ""}`}>스킬</Link>
                    </TabsTrigger>
                    <TabsTrigger asChild value="/union">
                        <Link href={`/char/${characterName}/union${queryString ? `?${queryString}` : ""}`}>유니온</Link>
                    </TabsTrigger>
                    <TabsTrigger asChild value="/content">
                        <Link href={`/char/${characterName}/content${queryString ? `?${queryString}` : ""}`}>컨텐츠/랭킹</Link>
                    </TabsTrigger>
                    <TabsTrigger asChild value="/history">
                        <Link href={`/char/${characterName}/history${queryString ? `?${queryString}` : ""}`}>히스토리</Link>
                    </TabsTrigger>
                    <TabsTrigger asChild value="/characters">
                        <Link href={`/char/${characterName}/characters${queryString ? `?${queryString}` : ""}`}>보유 캐릭터</Link>
                    </TabsTrigger>
                </TabsList>
            </Tabs >
        </>
    );
}
