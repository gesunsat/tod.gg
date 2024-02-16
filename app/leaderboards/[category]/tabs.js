import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function LeaderboardsTabs({ className, category }) {
    return (
        <Tabs className={cn("", className)} defaultValue={category}>
            <TabsList className="justify-start w-full overflow-x-scroll hidden-scroll flex gap-x-[10px] sm:grid sm:grid-cols-7">
                <TabsTrigger value="power" disabled>
                    <Link href="/leaderboards/power">전투력</Link>
                </TabsTrigger>
                <TabsTrigger asChild value="overall">
                    <Link href="/leaderboards/overall">종합</Link>
                </TabsTrigger>
                <TabsTrigger asChild value="guild">
                    <Link href="/leaderboards/guild">길드</Link>
                </TabsTrigger>
                <TabsTrigger asChild value="union">
                    <Link href="/leaderboards/union">유니온</Link>
                </TabsTrigger>
                <TabsTrigger asChild value="dojang">
                    <Link href="/leaderboards/dojang">무릉도장</Link>
                </TabsTrigger>
                <TabsTrigger asChild value="achievement">
                    <Link href="/leaderboards/achievement">업적</Link>
                </TabsTrigger>
                <TabsTrigger asChild value="theseed">
                    <Link href="/leaderboards/theseed">더 시드</Link>
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
}
