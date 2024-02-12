"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function LeaderboardsTabs(props) {
    let pathname = usePathname();
    pathname = pathname.replace(`/leaderboards`, "");

    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const queryString = params.toString();

    return (
        <Tabs defaultValue={pathname}>
            <TabsList className="justify-start w-full overflow-x-scroll hidden-scroll flex gap-x-[10px] sm:grid sm:grid-cols-7">
                <TabsTrigger asChild value="/power">
                    <Link href={`/leaderboards/power${queryString ? `?${queryString}` : ""}`}>전투력</Link>
                </TabsTrigger>
                <TabsTrigger asChild value="/overall">
                    <Link href={`/leaderboards/overall${queryString ? `?${queryString}` : ""}`}>종합</Link>
                </TabsTrigger>
                <TabsTrigger asChild value="/guild">
                    <Link href={`/leaderboards/guild${queryString ? `?${queryString}` : ""}`}>길드</Link>
                </TabsTrigger>
                <TabsTrigger asChild value="/union">
                    <Link href={`/leaderboards/union${queryString ? `?${queryString}` : ""}`}>유니온</Link>
                </TabsTrigger>
                <TabsTrigger asChild value="/dojang">
                    <Link href={`/leaderboards/dojang${queryString ? `?${queryString}` : ""}`}>무릉도장</Link>
                </TabsTrigger>
                <TabsTrigger asChild value="/achievement">
                    <Link href={`/leaderboards/achievement${queryString ? `?${queryString}` : ""}`}>업적</Link>
                </TabsTrigger>
                <TabsTrigger asChild value="/theseed">
                    <Link href={`/leaderboards/theseed${queryString ? `?${queryString}` : ""}`}>더 시드</Link>
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
}
