"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LeaderboardsGuildTabs({ className }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [searchQuery, setSearchQuery] = useState({
        "type": searchParams.get("type") || "suro"
    });

    const typeSelectorHandler = (type) => {
        const updatedQuery = { ...searchQuery, "type": type };
        const params = new URLSearchParams(searchParams);
        Object.keys(updatedQuery).forEach((key) => {
            if (updatedQuery[key]) {
                if (key == "type" && updatedQuery[key] == "suro") params.delete(key);
                else params.set(key, updatedQuery[key]);
            } else {
                params.delete(key);
            }
        });
        params.delete("page");
        const queryString = params.toString();
        const updatedPath = queryString ? `${pathname}?${queryString}` : pathname;

        router.replace(updatedPath);

        setSearchQuery(updatedQuery);
    }

    return (
        <Tabs className={cn("", className)} defaultValue={searchParams.type || "suro"} onValueChange={typeSelectorHandler}>
            <TabsList className="justify-start w-full overflow-x-scroll hidden-scroll grid grid-cols-3">
                <TabsTrigger value="suro">지하 수로</TabsTrigger>
                <TabsTrigger value="flag">플래그 레이스</TabsTrigger>
                <TabsTrigger value="fame">주간 명성치</TabsTrigger>
            </TabsList>
        </Tabs>
    );
}
