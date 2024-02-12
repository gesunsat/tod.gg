"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils";
import { classLevel } from "@/mapleData/classLevel";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Style from "./page.module.css";

export default function LeaderboardsJobList() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [searchQuery, setSearchQuery] = useState({
        "job": searchParams.get("job") || "전체"
    });

    const jobSelectorHandler = (job) => {
        const updatedQuery = { ...searchQuery, "job": job };
        const params = new URLSearchParams(searchParams);
        Object.keys(updatedQuery).forEach((key) => {
            if (updatedQuery[key]) {
                if (key == "date" && updatedQuery[key] == getYesterdayDate()) params.delete(key);
                else params.set(key, updatedQuery[key]);
            } else {
                params.delete(key);
            }
        });
        const queryString = params.toString();
        const updatedPath = queryString ? `${pathname}?${queryString}` : pathname;

        router.replace(updatedPath);

        setSearchQuery(updatedQuery);
    }

    return (
        <div className="h-[280px] mt-2">
            <div className="relative h-full">
                <div className="absolute h-full w-full">
                    <ScrollArea type={"always"} className="h-full">
                        <Tabs defaultValue={"전체"} value={searchQuery.job}>
                            <TabsList className={`justify-start w-full h-auto zoverflow-x-scroll gap-x-[10px] grid grid-cols-3 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-9`}>
                                {
                                    ["전체", ...Object.keys(classLevel).sort()].map((job, jobIndex) => {
                                        if (job != "전체" && !classLevel[job]?.["6"]) return;

                                        return (
                                            <TabsTrigger
                                                key={jobIndex}
                                                value={job}
                                                className="px-1 flex flex-col"
                                                onClick={() => jobSelectorHandler(job)}
                                            >
                                                <div className={cn("relative", Style.jobImage)}>
                                                    {/* <Image
                                                        className="aspect-square w-full h-auto scale-75 lg:scale-100"
                                                        src={
                                                            classLevel[job] ?
                                                                `/job/${job}.png` :
                                                                "/job/전체.png"
                                                        }
                                                        alt={job}
                                                        width={128}
                                                        height={128}
                                                    /> */}
                                                </div>
                                                <span className="text-xs lg:text-sm">{job}</span>
                                            </TabsTrigger>
                                        )
                                    })
                                }
                            </TabsList>
                        </Tabs>
                        <ScrollBar bar-color="bg-red-500" />
                    </ScrollArea>
                </div>
            </div>
        </div>
    )

}
